import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import connectDB from "@/app/lib/db";

import registration from "@/app/models/registration";
import { isTokenValid } from "@/app/lib/authmiddlewere";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    // Authenticate first
    const decoded = await isTokenValid(req);
  if (!decoded) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }


    const body = await req.json();
    const { id } = params;

    const updatedUser = await registration.findOneAndUpdate(
      { Id: id },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Error updating user", error: errMsg }, { status: 500 });
  }
}
