import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createSessionToken, attachSessionCookie } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = authenticateUser(email, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user.email, user.role);
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role,
      },
    });

    attachSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
