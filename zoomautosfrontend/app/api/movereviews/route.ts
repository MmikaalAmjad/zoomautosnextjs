import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ Send to your real API endpoint
    const response = await axios.post("https://zoomautos.co.uk/api/movereviews", body);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error("❌ Review API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
