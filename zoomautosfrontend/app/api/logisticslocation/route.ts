import connectDB from "@/app/lib/db";
import Location from "@/app/models/logisticslocation";
import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "@/app/lib/authmiddlewere";
export async function GET() {
  try {
    await connectDB();
    const location = await Location.findOne();
    if (!location) {
      return NextResponse.json({ message: "Location data not found." }, { status: 404 });
    }
    return NextResponse.json(location);
  } catch (err: any) {
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const valid = await isTokenValid(req);
      if (!valid) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    const body = await req.json();
    const { locationUrl, address } = body;

    if (!locationUrl || !address) {
      return NextResponse.json(
        { message: "Location URL and address are required." },
        { status: 400 }
      );
    }

    let location = await Location.findOne();
    if (!location) {
      location = new Location({ locationUrl, address });
    } else {
      location.locationUrl = locationUrl;
      location.address = address;
    }

    await location.save();
    return NextResponse.json({ message: "Location data updated successfully." });
  } catch (err: any) {
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
