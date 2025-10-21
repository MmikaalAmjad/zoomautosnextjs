import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import registration from "@/app/models/registration";

export async function PATCH(req: NextRequest, context: any) {
  await connectDB();

  const { token } = context.params; // dynamic route param

  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    // Find user by reset token
    const user = await registration.findOne({ resetToken: token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // Update password (plain text)
    user.password = password;

    // Clear reset token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password successfully reset." });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal server error", error: errMsg },
      { status: 500 }
    );
  }
}
