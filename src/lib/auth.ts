import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabaseClient } from './supabase';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'cms', 'users.json');
const TMP_USERS_FILE = path.join(os.tmpdir(), 'ramesh_bs_cms', 'users.json');
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lcb-brigade-secure-cms-secret-key-2026';
export const COOKIE_NAME = 'admin_session';

declare global {
  var __RAMESH_CMS_USERS__: AdminUser[] | undefined;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'editor';
  status: 'active' | 'disabled';
  salt: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export type SafeAdminUser = Omit<AdminUser, 'salt' | 'passwordHash'>;

export interface SessionPayload {
  sub: string;
  email: string;
  role: 'owner' | 'admin' | 'editor';
  iat: number;
  exp: number;
}

// Generate secure salt and hash using PBKDF2
export function hashPassword(password: string, salt?: string): { salt: string; hash: string } {
  const chosenSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, chosenSalt, 100000, 64, 'sha512').toString('hex');
  return { salt: chosenSalt, hash };
}

// Verify password
export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const generated = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(generated, 'utf-8'), Buffer.from(hash, 'utf-8'));
}

// Base64Url encode/decode for manual JWT
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

// Create signed JWT
export function createSessionToken(
  email: string,
  role: 'owner' | 'admin' | 'editor' = 'owner',
  id = '',
  expiresInDays = 7
): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: id || email,
    email,
    role,
    iat: now,
    exp: now + expiresInDays * 24 * 60 * 60,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify signed JWT
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, 'utf-8'),
        Buffer.from(expectedSignature, 'utf-8')
      )
    ) {
      return null;
    }

    const decodedPayload = JSON.parse(base64UrlDecode(payload)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && decodedPayload.exp < now) {
      return null;
    }

    return decodedPayload;
  } catch {
    return null;
  }
}

// Helper: save users across storage tiers
export async function saveUsers(users: AdminUser[]): Promise<boolean> {
  globalThis.__RAMESH_CMS_USERS__ = users;
  let persisted = false;

  // 1. Serverless writable fallback (/tmp)
  try {
    const tmpDir = path.dirname(TMP_USERS_FILE);
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(TMP_USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    persisted = true;
  } catch {}

  // 2. Project data directory (if writable)
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    persisted = true;
  } catch {}

  // 3. Supabase durable document
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('cms_documents')
        .upsert({
          key: 'users',
          data: users,
          updated_at: new Date().toISOString(),
        });
      if (error) {
        console.error('Error persisting admin users in Supabase:', error);
        if (process.env.VERCEL) {
          throw new Error(`Failed to persist admin users in Supabase: ${error.message}`);
        }
      } else {
        persisted = true;
      }
    } catch (err) {
      if (process.env.VERCEL) throw err;
    }
  } else if (process.env.VERCEL) {
    throw new Error('Supabase durable database connection is not configured in production');
  }

  return persisted || true;
}

// Ensure users.json exists with default admin credentials & normalized structure
export async function ensureUsersFile(): Promise<AdminUser[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cms_documents')
        .select('data')
        .eq('key', 'users')
        .maybeSingle();

      if (!error && data && Array.isArray(data.data) && data.data.length > 0) {
        globalThis.__RAMESH_CMS_USERS__ = data.data as AdminUser[];
        return data.data as AdminUser[];
      }
    } catch (err) {
      console.warn('Notice: Error reading users from Supabase:', err);
    }
  }

  // 1. In-memory cache
  if (globalThis.__RAMESH_CMS_USERS__ && globalThis.__RAMESH_CMS_USERS__.length > 0) {
    return globalThis.__RAMESH_CMS_USERS__;
  }

  // 2. Check /tmp
  try {
    if (fs.existsSync(TMP_USERS_FILE)) {
      const raw = fs.readFileSync(TMP_USERS_FILE, 'utf-8');
      const users = JSON.parse(raw) as AdminUser[];
      if (Array.isArray(users) && users.length > 0) {
        globalThis.__RAMESH_CMS_USERS__ = users;
        return users;
      }
    }
  } catch {}

  // 3. Check bundled static file
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, 'utf-8');
      let users = JSON.parse(raw) as AdminUser[];
      if (Array.isArray(users) && users.length > 0) {
        // Auto-normalize legacy records
        users = users.map((u, idx) => ({
          ...u,
          status: u.status || 'active',
          role: u.role || (idx === 0 ? 'owner' : 'admin'),
          createdAt: u.createdAt || u.updatedAt || new Date().toISOString(),
        }));
        globalThis.__RAMESH_CMS_USERS__ = users;
        return users;
      }
    }
  } catch {}

  // 4. Default admin user
  const { salt, hash } = hashPassword('admin123');
  const defaultUser: AdminUser = {
    id: 'admin-1',
    email: 'admin@portfolio.com',
    role: 'owner',
    status: 'active',
    salt,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await saveUsers([defaultUser]);
  globalThis.__RAMESH_CMS_USERS__ = [defaultUser];
  return [defaultUser];
}

// Authenticate user credentials
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: AdminUser | null; error?: string }> {
  const users = await ensureUsersFile();
  const user = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (!user) {
    return { user: null, error: 'Invalid email or password' };
  }

  if (user.status === 'disabled') {
    return {
      user: null,
      error: 'This administrator account has been disabled. Please contact the site owner.',
    };
  }

  const isValid = verifyPassword(password, user.salt, user.passwordHash);
  if (!isValid) {
    return { user: null, error: 'Invalid email or password' };
  }

  return { user };
}

// Get all administrators without exposing password hashes or salts
export async function getAllAdminUsers(): Promise<SafeAdminUser[]> {
  const users = await ensureUsersFile();
  return users.map((u) => ({
    id: u.id,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));
}

// Create a new administrator account (secured & hashed)
export async function createAdminUser(params: {
  email: string;
  password: string;
  role?: 'owner' | 'admin' | 'editor';
}): Promise<{ success: boolean; user?: SafeAdminUser; error?: string }> {
  const email = (params.email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }

  if (!params.password || params.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' };
  }

  const users = await ensureUsersFile();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { success: false, error: 'An administrator with this email address already exists' };
  }

  const role = params.role || 'admin';
  const { salt, hash } = hashPassword(params.password);
  const newUser: AdminUser = {
    id: `admin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    email,
    role,
    status: 'active',
    salt,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveUsers(users);

  const safeUser: SafeAdminUser = {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
  return { success: true, user: safeUser };
}

// Update an administrator's active/disabled status
export async function updateAdminUserStatus(
  id: string,
  newStatus: 'active' | 'disabled',
  callerEmail: string
): Promise<{ success: boolean; error?: string }> {
  const users = await ensureUsersFile();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { success: false, error: 'Administrator account not found' };
  }

  if (user.email.toLowerCase() === callerEmail.toLowerCase()) {
    return { success: false, error: 'You cannot disable your own administrator account' };
  }

  // Prevent disabling if this is the only active owner/admin
  const activeAdmins = users.filter(
    (u) => u.status === 'active' && (u.role === 'owner' || u.role === 'admin')
  );
  if (
    (user.role === 'owner' || user.role === 'admin') &&
    newStatus === 'disabled' &&
    activeAdmins.length <= 1 &&
    user.status === 'active'
  ) {
    return {
      success: false,
      error: 'Cannot disable the last active administrator. At least one active admin must remain.',
    };
  }

  user.status = newStatus;
  user.updatedAt = new Date().toISOString();
  await saveUsers(users);
  return { success: true };
}

// Update an administrator's role
export async function updateAdminUserRole(
  id: string,
  newRole: 'owner' | 'admin' | 'editor',
  callerEmail: string
): Promise<{ success: boolean; error?: string }> {
  const users = await ensureUsersFile();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { success: false, error: 'Administrator account not found' };
  }

  if (user.email.toLowerCase() === callerEmail.toLowerCase() && newRole === 'editor') {
    const activeAdmins = users.filter(
      (u) => u.status === 'active' && (u.role === 'owner' || u.role === 'admin')
    );
    if (activeAdmins.length <= 1) {
      return {
        success: false,
        error: 'Cannot remove administrative permissions from the only remaining administrator.',
      };
    }
  }

  user.role = newRole;
  user.updatedAt = new Date().toISOString();
  await saveUsers(users);
  return { success: true };
}

// Reset an administrator's password
export async function resetAdminUserPassword(
  id: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' };
  }

  const users = await ensureUsersFile();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { success: false, error: 'Administrator account not found' };
  }

  const { salt, hash } = hashPassword(newPassword);
  user.salt = salt;
  user.passwordHash = hash;
  user.updatedAt = new Date().toISOString();
  await saveUsers(users);
  return { success: true };
}

// Delete an administrator account
export async function deleteAdminUser(
  id: string,
  callerEmail: string
): Promise<{ success: boolean; error?: string }> {
  const users = await ensureUsersFile();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { success: false, error: 'Administrator account not found' };
  }

  if (user.email.toLowerCase() === callerEmail.toLowerCase()) {
    return { success: false, error: 'You cannot delete your own administrator account' };
  }

  const activeAdmins = users.filter(
    (u) => u.status === 'active' && (u.role === 'owner' || u.role === 'admin')
  );
  if (
    (user.role === 'owner' || user.role === 'admin') &&
    activeAdmins.length <= 1 &&
    user.status === 'active'
  ) {
    return {
      success: false,
      error: 'Cannot delete the last remaining active administrator account.',
    };
  }

  const updatedUsers = users.filter((u) => u.id !== id);
  await saveUsers(updatedUsers);
  return { success: true };
}

// Change current password by email
export async function updatePassword(email: string, newPassword: string): Promise<boolean> {
  const users = await ensureUsersFile();
  const userIndex = users.findIndex(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (userIndex === -1) return false;

  const { salt, hash } = hashPassword(newPassword);
  users[userIndex].salt = salt;
  users[userIndex].passwordHash = hash;
  users[userIndex].updatedAt = new Date().toISOString();

  await saveUsers(users);
  return true;
}


// Check session in server request or cookies
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

// Verify session from an incoming Request object (for API routes)
export function getSessionFromRequest(request: Request): SessionPayload | null {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));

    if (!match) return null;
    const token = match.substring(`${COOKIE_NAME}=`.length);
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

// Response cookie helper
export function attachSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

// Remove session cookie
export function removeSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
