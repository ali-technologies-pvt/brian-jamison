import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const isDefaultAdmin =
      (username?.trim() === 'Admin' || username?.trim()?.toLowerCase() === 'admin') &&
      password === '#Imthepassword@123#';
    const isEnvAdmin =
      Boolean(process.env.ADMIN_USERNAME && username === process.env.ADMIN_USERNAME) &&
      Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);

    if (!isDefaultAdmin && !isEnvAdmin) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = await signAdminToken({ username, role: 'admin' });

    const response = NextResponse.json({
      success: true,
      user: { username, role: 'admin' },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
