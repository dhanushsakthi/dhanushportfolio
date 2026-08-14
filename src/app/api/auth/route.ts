import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData, hashPassword } from '@/lib/db';
import { createToken, checkAdminSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const isAuth = await checkAdminSession();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: Request) {
  try {
    const { action, username, password, newPassword } = await req.json();
    const data = getPortfolioData();

    if (action === 'login') {
      const inputHash = hashPassword(password || '');
      const storedHash = data.siteSettings.adminPasswordHash || hashPassword('dhanush123');

      // Allow admin login with 'admin' username
      if (username === 'admin' && inputHash === storedHash) {
        const token = createToken({ role: 'admin', user: 'admin' });
        const cookieStore = await cookies();
        cookieStore.set('dhanush_admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/'
        });

        return NextResponse.json({ success: true, message: 'Login successful' });
      }

      return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
    }

    if (action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete('dhanush_admin_token');
      return NextResponse.json({ success: true, message: 'Logged out' });
    }

    if (action === 'change-password') {
      const isAuth = await checkAdminSession();
      if (!isAuth) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ success: false, message: 'Password must be at least 6 characters' }, { status: 400 });
      }

      data.siteSettings.adminPasswordHash = hashPassword(newPassword);
      savePortfolioData(data);
      return NextResponse.json({ success: true, message: 'Admin password updated successfully' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
