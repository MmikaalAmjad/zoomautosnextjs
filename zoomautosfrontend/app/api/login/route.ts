import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import connectDB from "@/app/lib/db";
import registration from "@/app/models/registration";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { identifier, password } = body;

    const user = await registration.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${identifier}$`, "i") } },
        { email: { $regex: new RegExp(`^${identifier}$`, "i") } },
      ],
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "secret"
      
    );

    return NextResponse.json({ user, token });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Server error", error: errMsg }, { status: 500 });
  }
}
