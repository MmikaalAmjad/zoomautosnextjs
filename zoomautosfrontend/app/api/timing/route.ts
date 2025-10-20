import { NextRequest } from "next/server";

import connectDB from "@/app/lib/db";
import Timing from "@/app/models/timing";

// GET all timings
export async function GET() {
  try {
    await connectDB();
    const timings = await Timing.find();
    return new Response(JSON.stringify(timings), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST update or create timing
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { day, startTime, endTime } = await req.json();

    let timing = await Timing.findOne({ day });
    if (timing) {
      timing.startTime = startTime;
      timing.endTime = endTime;
      await timing.save();
    } else {
      timing = new Timing({ day, startTime, endTime });
      await timing.save();
    }

    return new Response(JSON.stringify(timing), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
