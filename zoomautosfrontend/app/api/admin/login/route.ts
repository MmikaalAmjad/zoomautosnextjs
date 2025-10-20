import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/db';
import Admin from '@/app/models/admin';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password required' }, { status: 400 });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET!
      
    );

console.log("SIGNING with secret:", process.env.JWT_SECRET);
console.log("TOKEN:", token);


    return NextResponse.json({
      message: 'Login successful',
      token,
      admin: { username: admin.username, role: admin.role },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
