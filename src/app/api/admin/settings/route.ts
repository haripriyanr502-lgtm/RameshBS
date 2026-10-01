import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, verifyPassword, updatePassword, ensureUsersFile } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const { action, currentPassword, newPassword } = await request.json();

    if (action === 'change_password') {
      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { error: 'Current password and new password are required' },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      const users = await ensureUsersFile();
      const currentUser = users.find((u) => u.email === session.email);
      if (!currentUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const isValid = verifyPassword(currentPassword, currentUser.salt, currentUser.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      const updated = await updatePassword(session.email, newPassword);
      if (!updated) {
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully',
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Settings error:', error);
    return NextResponse.json({ error: 'Failed to process settings request' }, { status: 500 });
  }
}
