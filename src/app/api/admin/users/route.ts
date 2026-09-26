import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromRequest,
  getAllAdminUsers,
  createAdminUser,
  updateAdminUserStatus,
  updateAdminUserRole,
  resetAdminUserPassword,
  deleteAdminUser,
  SessionPayload,
} from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

type AuthResult =
  | { authorized: true; session: SessionPayload }
  | { authorized: false; response: NextResponse };

function checkAdminAuthorization(request: NextRequest): AuthResult {
  const session = getSessionFromRequest(request);
  if (!session) {
    return { authorized: false, response: NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 }) };
  }

  if (session.role !== 'owner' && session.role !== 'admin') {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Forbidden: You do not have permission to manage administrator accounts' },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, session };
}

// GET /api/admin/users - List all administrators
export async function GET(request: NextRequest) {
  const auth = checkAdminAuthorization(request);
  if (!auth.authorized) return auth.response;

  try {
    const users = getAllAdminUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json({ error: 'Failed to retrieve administrator list' }, { status: 500 });
  }
}

// POST /api/admin/users - Create new administrator
export async function POST(request: NextRequest) {
  const auth = checkAdminAuthorization(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and initial password are required' },
        { status: 400 }
      );
    }

    const result = createAdminUser({
      email,
      password,
      role: role === 'editor' ? 'editor' : 'admin',
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to create admin user' }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully.',
        user: result.user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while creating administrator' }, { status: 500 });
  }
}

// PATCH /api/admin/users - Update status, role, or reset password
export async function PATCH(request: NextRequest) {
  const auth = checkAdminAuthorization(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, action, status, role, password } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'Target user ID and action are required' }, { status: 400 });
    }

    if (action === 'toggle_status') {
      if (!status || (status !== 'active' && status !== 'disabled')) {
        return NextResponse.json({ error: 'Valid status (active/disabled) required' }, { status: 400 });
      }
      const result = updateAdminUserStatus(id, status, auth.session.email);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: `Administrator account marked as ${status}.`,
      });
    }

    if (action === 'change_role') {
      if (!role || (role !== 'owner' && role !== 'admin' && role !== 'editor')) {
        return NextResponse.json({ error: 'Valid role required' }, { status: 400 });
      }
      const result = updateAdminUserRole(id, role, auth.session.email);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: `Administrator role updated to ${role}.`,
      });
    }

    if (action === 'reset_password') {
      if (!password || password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
      }
      const result = resetAdminUserPassword(id, password);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: 'Password reset successfully.',
      });
    }

    return NextResponse.json({ error: 'Unrecognized action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json({ error: 'Failed to update administrator record' }, { status: 500 });
  }
}

// DELETE /api/admin/users - Remove administrator
export async function DELETE(request: NextRequest) {
  const auth = checkAdminAuthorization(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Target user ID is required' }, { status: 400 });
    }

    const result = deleteAdminUser(id, auth.session.email);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Administrator account removed successfully.',
    });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json({ error: 'Failed to delete administrator' }, { status: 500 });
  }
}
