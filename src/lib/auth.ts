import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'cms', 'users.json');
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lcb-brigade-secure-cms-secret-key-2026';
export const COOKIE_NAME = 'admin_session';

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

// Ensure users.json exists with default admin credentials & normalized structure
export function ensureUsersFile(): AdminUser[] {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(USERS_FILE)) {
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
      fs.writeFileSync(USERS_FILE, JSON.stringify([defaultUser], null, 2), 'utf-8');
      return [defaultUser];
    }

    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    let users = JSON.parse(raw) as AdminUser[];
    if (!users || users.length === 0) {
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
      fs.writeFileSync(USERS_FILE, JSON.stringify([defaultUser], null, 2), 'utf-8');
      return [defaultUser];
    }

    // Auto-normalize legacy records without status or createdAt
    let modified = false;
    users = users.map((u, idx) => {
      let itemChanged = false;
      const copy = { ...u };
      if (!copy.status) {
        copy.status = 'active';
        itemChanged = true;
      }
      if (!copy.role) {
        copy.role = idx === 0 ? 'owner' : 'admin';
        itemChanged = true;
      }
      if (!copy.createdAt) {
        copy.createdAt = copy.updatedAt || new Date().toISOString();
        itemChanged = true;
      }
      if (itemChanged) modified = true;
      return copy;
    });

    if (modified) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    }

    return users;
  } catch (err) {
    console.error('Error ensuring users file:', err);
    return [];
  }
}

// Authenticate user credentials
export function authenticateUser(
  email: string,
  password: string
): { user: AdminUser | null; error?: string } {
  const users = ensureUsersFile();
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
export function getAllAdminUsers(): SafeAdminUser[] {
  const users = ensureUsersFile();
  return users.map(({ salt, passwordHash, ...safe }) => safe);
}

// Create a new administrator account (secured & hashed)
export function createAdminUser(params: {
  email: string;
  password: string;
  role?: 'owner' | 'admin' | 'editor';
}): { success: boolean; user?: SafeAdminUser; error?: string } {
  const email = (params.email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }

  if (!params.password || params.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' };
  }

  const users = ensureUsersFile();
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
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

  const { salt: _s, passwordHash: _p, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

// Update an administrator's active/disabled status
export function updateAdminUserStatus(
  id: string,
  newStatus: 'active' | 'disabled',
  callerEmail: string
): { success: boolean; error?: string } {
  const users = ensureUsersFile();
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
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  return { success: true };
}

// Update an administrator's role
export function updateAdminUserRole(
  id: string,
  newRole: 'owner' | 'admin' | 'editor',
  callerEmail: string
): { success: boolean; error?: string } {
  const users = ensureUsersFile();
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
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  return { success: true };
}

// Reset an administrator's password
export function resetAdminUserPassword(
  id: string,
  newPassword: string
): { success: boolean; error?: string } {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' };
  }

  const users = ensureUsersFile();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { success: false, error: 'Administrator account not found' };
  }

  const { salt, hash } = hashPassword(newPassword);
  user.salt = salt;
  user.passwordHash = hash;
  user.updatedAt = new Date().toISOString();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  return { success: true };
}

// Delete an administrator account
export function deleteAdminUser(
  id: string,
  callerEmail: string
): { success: boolean; error?: string } {
  const users = ensureUsersFile();
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
  fs.writeFileSync(USERS_FILE, JSON.stringify(updatedUsers, null, 2), 'utf-8');
  return { success: true };
}

// Change current password by email
export function updatePassword(email: string, newPassword: string): boolean {
  const users = ensureUsersFile();
  const userIndex = users.findIndex(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (userIndex === -1) return false;

  const { salt, hash } = hashPassword(newPassword);
  users[userIndex].salt = salt;
  users[userIndex].passwordHash = hash;
  users[userIndex].updatedAt = new Date().toISOString();

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
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
