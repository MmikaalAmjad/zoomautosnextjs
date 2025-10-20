import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import MoveReview from '@/app/models/reviews';
import nodemailer from 'nodemailer';

// Initialize mail transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ GET all reviews
export async function GET() {
  try {
    await connectDB();
    const reviews = await MoveReview.find();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// ✅ POST a new review
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { Name, jobId, rating, feedback, professionalism, communication, driver } = await req.json();

    if (!Name || !rating) {
      return NextResponse.json({ message: 'Name and Rating are required' }, { status: 400 });
    }

    const newReview = new MoveReview({
      Name,
      jobId: jobId || null,
      rating,
      feedback: feedback || '',
      professionalism: professionalism || null,
      communication: communication || null,
      driver: driver || null,
    });

    const savedReview = await newReview.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'zohaqaiser41@gmail.com',
      subject: 'New Review Submitted',
      text: `A new review has been submitted by ${Name} with a rating of ${rating}.
      ${feedback ? `Feedback: ${feedback}` : ''}
      ${professionalism ? `Professionalism: ${professionalism}` : ''}
      ${communication ? `Communication: ${communication}` : ''}
      ${driver ? `Driver Rating: ${driver}` : ''}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json(savedReview, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500 });
  }
}

// ✅ DELETE a review
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const deletedReview = await MoveReview.findByIdAndDelete(id);
    if (!deletedReview) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted successfully', deletedReview }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ message: 'Error deleting review' }, { status: 500 });
  }
}
