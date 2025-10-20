import { NextRequest } from "next/server";
import connectDB from "@/app/lib/db";
import LogisticsEmail from "@/app/models/logisticsemail";
import { isTokenValid } from "@/app/lib/authmiddlewere";
import { NextResponse } from "next/server";
await connectDB();

// GET handler
export async function GET() {
  try {
    const email = await LogisticsEmail.findOne();
    if (!email)
      return new Response(JSON.stringify({ message: "Email not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(email), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT handler
export async function PUT(req: NextRequest) {
  try {
    const valid = await isTokenValid(req);
      if (!valid) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    const body = await req.json();
    const { email } = body;

    let emailData = await LogisticsEmail.findOne();
    if (!emailData) {
      emailData = new LogisticsEmail({ email });
    } else {
      emailData.email = email;
      emailData.updatedAt = new Date();
    }

    await emailData.save();
    return new Response(JSON.stringify({ message: "Email updated", emailData }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
