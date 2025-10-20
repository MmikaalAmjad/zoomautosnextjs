import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import SubContractJob from '@/app/models/subcontractjob';
import { sendJobUpdateToUser } from '@/app/lib/firebasenotification';
import { isTokenValid } from '@/app/lib/authmiddlewere';

export async function PATCH(req: NextRequest, { params }: { params: { jobId: string } }) {
  await connectDB();

const valid = await isTokenValid(req);
  if (!valid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const updateData = await req.json();
    const updatedRecord = await SubContractJob.findOneAndUpdate(
      { jobId: params.jobId },
      updateData,
      { new: true }
    );

    if (!updatedRecord)
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });


    // Send update to Firebase only if status is Active
    if (updateData.status === "Active") {
      const userId = updatedRecord.customerid;
      await sendJobUpdateToUser(userId, {
        jobId: updatedRecord.jobId,
        status: updatedRecord.status,
        title: updatedRecord.title || "",
        updatedAt: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      message: 'Record updated successfully',
      data: updatedRecord,
    });
  } catch (error: any) {
    console.error('Error updating record:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    await connectDB();
    const valid = await isTokenValid(req);
  if (!valid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

    const { jobId } = params;
    const deletedRecord = await SubContractJob.findOneAndDelete({ jobId });

    if (!deletedRecord) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Record deleted successfully', deletedRecord });
  } catch (error: any) {
    console.error('❌ Error deleting record:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    await connectDB();

    // 🔐 Verify token
    const valid = await isTokenValid(req);
    if (!valid) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = params;
    console.log('Fetching jobId:', jobId);

    if (!jobId) {
      return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
    }

    // 🔍 Find the record by jobId
    const record = await SubContractJob.findOne({ jobId });

    if (!record) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    // ✅ Success
    return NextResponse.json(record, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching record by jobId:', error);
    return NextResponse.json(
      { message: 'Error fetching record', error: error.message },
      { status: 500 }
    );
  }
}
