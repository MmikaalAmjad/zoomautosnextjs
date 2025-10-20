import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Responsibility from '@/app/models/responsibilities';
// GET all responsibilities
export async function GET() {
  try {
    await connectDB();
    const responsibilities = await Responsibility.find();
    return NextResponse.json(responsibilities, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error fetching responsibilities' }, { status: 500 });
  }
}

// POST add a new responsibility
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const newResponsibility = new Responsibility({ name });
    await newResponsibility.save();

    return NextResponse.json(newResponsibility, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error adding responsibility' }, { status: 500 });
  }
}

// PUT update a responsibility
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const { name } = await req.json();

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const updatedResponsibility = await Responsibility.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedResponsibility) return NextResponse.json({ error: 'Responsibility not found' }, { status: 404 });

    return NextResponse.json(updatedResponsibility, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error updating responsibility' }, { status: 500 });
  }
}

// DELETE a responsibility
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await Responsibility.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Responsibility deleted successfully' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error deleting responsibility' }, { status: 500 });
  }
}
