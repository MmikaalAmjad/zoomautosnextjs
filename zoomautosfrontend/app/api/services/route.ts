import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import MoveService from '@/app/models/services';
import nodemailer from 'nodemailer';

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// GET all services
export async function GET() {
  try {
    await connectDB();
    const services = await MoveService.find();
    return NextResponse.json(services, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST (Add a new service)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { description } = await req.json();
    if (!description) {
      return NextResponse.json({ message: 'Description is required' }, { status: 400 });
    }

    const newService = new MoveService({ description });
    const savedService = await newService.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'zohaqaiser41@gmail.com',
      subject: 'New Move Service Submitted',
      text: `A new Move Service has been added: ${description}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return NextResponse.json(savedService, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PUT (Update a service)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const { description } = await req.json();

    if (!id) return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });
    if (!description) return NextResponse.json({ message: 'Description is required' }, { status: 400 });

    const updatedService = await MoveService.findByIdAndUpdate(
      id,
      { description },
      { new: true, runValidators: true }
    );

    if (!updatedService) return NextResponse.json({ message: 'Service not found' }, { status: 404 });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE a service
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });

    const deletedService = await MoveService.findByIdAndDelete(id);

    if (!deletedService) return NextResponse.json({ message: 'Service not found' }, { status: 404 });

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
