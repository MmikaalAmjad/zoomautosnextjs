import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Role from '@/app/models/roles';
import { isTokenValid } from '@/app/lib/authmiddlewere';
// GET all roles
export async function GET() {
  try {
    await connectDB();
    const roles = await Role.find();
    return NextResponse.json(roles, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}

// POST add a new role (requires auth)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const valid = await isTokenValid(req);
  if (!valid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const newRole = new Role({ name });
    await newRole.save();

    return NextResponse.json(newRole, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error adding role' }, { status: 500 });
  }
}

// PUT update a role (requires auth)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
const valid = await isTokenValid(req);
  if (!valid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const { name } = await req.json();

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const updatedRole = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedRole) return NextResponse.json({ error: 'Role not found' }, { status: 404 });

    return NextResponse.json(updatedRole, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating role' }, { status: 500 });
  }
}

// DELETE a role (requires auth)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const valid = await isTokenValid(req);
  if (!valid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await Role.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Role deleted successfully' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error deleting role' }, { status: 500 });
  }
}
