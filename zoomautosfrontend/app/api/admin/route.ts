import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import Admin from '@/app/models/admin';
import connectDB from '@/app/lib/db';

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ message: 'No token provided' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const admins = await Admin.find();
    return NextResponse.json(admins);
  } catch (error: any) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const path = req.nextUrl.pathname;

  const body = await req.json();
  const { username, password, role } = body;

  // If it's login
  if (path.endsWith('/admin/login')) {
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });

if (admin.password !== password) {
            return  NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        process.env.JWT_SECRET!,
        
      );

      return NextResponse.json({
        message: 'Login successful',
        token,
        admin,
      });
    } catch (error: any) {
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
  }

  // Else, add a new admin
  try {
    const newAdmin = new Admin({ username, password: password, role });
    await newAdmin.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: 'zohaqaiser41@gmail.com',
      subject: 'New Admin Added',
      text: `A new Admin has been added with Username: ${username}.`,
    };

      await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Admin added successfully', newAdmin });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error adding admin', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ message: 'No token provided' }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== 'SuperAdmin') {
      return NextResponse.json({ message: 'Only SuperAdmins can delete admins' }, { status: 403 });
    }

    const username = req.nextUrl.searchParams.get('username');
    if (!username) return NextResponse.json({ message: 'Username is required' }, { status: 400 });

    const deletedAdmin = await Admin.findOneAndDelete({ username });

    if (!deletedAdmin) return NextResponse.json({ message: 'Admin not found' }, { status: 404 });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: 'zohaqaiser41@gmail.com',
      subject: 'Admin Deleted',
      text: `The Admin with Username: ${username} has been deleted.`,
    };

    if (process.env.NODE_ENV === 'production') {
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ message: 'Admin deleted successfully', deletedAdmin });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting admin', error: error.message }, { status: 500 });
  }
}
