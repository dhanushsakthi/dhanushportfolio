import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dhanush_portfolio_super_secret_jwt_key_2026';
const TOKEN_NAME = 'dhanush_admin_token';

export function createToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return false;
    const decoded = verifyToken(token);
    return decoded && decoded.role === 'admin';
  } catch (err) {
    return false;
  }
}
