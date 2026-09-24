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
  role: 'owner' | 'admin';
  salt: string;
  passwordHash: string;
  updatedAt: string;
}

export interface SessionPayload {
  sub: string;
  email: string;
  role: string;
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
export function createSessionToken(email: string, role = 'owner', expiresInDays = 7): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: 'admin-owner',
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

// Ensure users.json exists with default admin credentials
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
        salt,
        passwordHash: hash,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(USERS_FILE, JSON.stringify([defaultUser], null, 2), 'utf-8');
      return [defaultUser];
    }

    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    const users = JSON.parse(raw) as AdminUser[];
    if (!users || users.length === 0) {
      const { salt, hash } = hashPassword('admin123');
      const defaultUser: AdminUser = {
        id: 'admin-1',
        email: 'admin@portfolio.com',
        role: 'owner',
        salt,
        passwordHash: hash,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(USERS_FILE, JSON.stringify([defaultUser], null, 2), 'utf-8');
      return [defaultUser];
    }

    return users;
  } catch (err) {
    console.error('Error ensuring users file:', err);
    return [];
  }
}

// Authenticate user credentials
export function authenticateUser(email: string, password: string): AdminUser | null {
  const users = ensureUsersFile();
  const user = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (!user) return null;

  const isValid = verifyPassword(password, user.salt, user.passwordHash);
  if (!isValid) return null;

  return user;
}

// Change password
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
