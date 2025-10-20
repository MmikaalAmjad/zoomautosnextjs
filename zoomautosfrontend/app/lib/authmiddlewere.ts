import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function isTokenValid(req: NextRequest): Promise<any | null> {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded; // return payload instead of true
  } catch (error) {
    console.error('❌ Invalid token:', error);
    return null;
  }
}
