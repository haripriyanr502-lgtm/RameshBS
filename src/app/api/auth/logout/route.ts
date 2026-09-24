import { NextResponse } from 'next/server';
import { removeSessionCookie } from '../../../../lib/auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
  removeSessionCookie(response);
  return response;
}
