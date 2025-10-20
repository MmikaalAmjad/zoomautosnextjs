import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import connectDB from "@/app/lib/db";
import registration from "@/app/models/registration";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;

  try {
    const body = await req.json();
    const { newPassword } = body;

    if (!newPassword) {
      return NextResponse.json({ message: "New password is required" }, { status: 400 });
    }

    const user = await registration.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update password (without hashing)
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password successfully reset." });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Internal server error", error: errMsg }, { status: 500 });
  }
}
