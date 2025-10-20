import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/app/lib/db';
import nodemailer from 'nodemailer';
import { isTokenValid } from '@/app/lib/authmiddlewere';
import { getDynamicFormModel } from '@/app/models/dynamicmodel';
import SubContractJob from '@/app/models/subcontractjob';
// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { formType = 'Sub Contract Jobs', ...formData } = body;

    const Form = getDynamicFormModel(formType);
    if (!Form) {
      return NextResponse.json({ message: `Error: Invalid form type ${formType}` }, { status: 500 });
    }

    console.time('Total Submission Time');

    // Generate jobId for Sub Contract Jobs
    console.time('Query Execution Time');
    console.timeEnd('Query Execution Time');
    // Get last record to find jobId
const lastUser = await Form.findOne({}, { jobId: 1 }).sort({ jobId: -1 }).lean().exec();

// Explicitly assert the type so TypeScript knows jobId may exist
const lastJobId = (lastUser as { jobId?: string | number })?.jobId;

const randomFourDigit = Math.floor(Math.random() * 900) + 100;
const newId = lastJobId ? Number(lastJobId) + randomFourDigit : 1000000 + randomFourDigit;
const fnewId = newId.toString();


    const jobId = newId.toString();

    // Add metadata
    formData.date = new Date().toISOString();
    formData.jobId = jobId;

    // Save to DB
    console.time('Database Save Time');
    const newForm = new Form(formData);
    await newForm.save();
    console.timeEnd('Database Save Time');

    console.timeEnd('Total Submission Time');


    return NextResponse.json(
      { message: `${formType} form submitted successfully`, jobId },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error in Sub Contract Jobs route:', err);
    return NextResponse.json(
      { message: 'Error submitting Sub Contract Jobs form', error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  console.log(req)
const decoded = await isTokenValid(req);
  if (!decoded) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // e.g. ?type=by-company or ?type=no-company

    if (type === 'by-company') {
      const jobCounts = await SubContractJob.aggregate([
        {
          $match: {
            $and: [{ customerid: { $ne: null } }, { customerid: { $ne: '' } }],
          },
        },
        {
          $group: {
            _id: '$customerid',
            count: { $sum: 1 },
          },
        },
      ]);
      return NextResponse.json(jobCounts);
    }

    if (type === 'no-company') {
      const jobCounts = await SubContractJob.aggregate([
        {
          $match: {
            $or: [{ customercompanyName: null }, { customercompanyName: '' }],
          },
        },
        {
          $group: {
            _id: '$customername',
            email: { $first: '$customeremail' },
            contact: { $first: '$customercontact' },
            customeraddress: { $first: '$customeraddress' },
            count: { $sum: 1 },
          },
        },
      ]);
      return NextResponse.json(jobCounts);
    }

    // Default: return all jobs
    const records = await SubContractJob.find();
    return NextResponse.json(records);
  } catch (error: any) {
    console.error('❌ Error fetching jobs:', error);
    return NextResponse.json({ message: 'Error fetching jobs', error: error.message }, { status: 500 });
  }
}