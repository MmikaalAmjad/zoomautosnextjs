import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import WhatWeDo from "@/app/models/whatwedo";
// GET all items
export async function GET() {
  try {
    await connectDB();
    const content = await WhatWeDo.find();
    return new Response(JSON.stringify(content), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST new item
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newContent = new WhatWeDo(body);
    const saved = await newContent.save();
    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT (update) an item
export async function PUT(req: NextRequest, context: any) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await WhatWeDo.findByIdAndUpdate(context.params.id, body, { new: true });

    if (!updated)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    await connectDB();
    const deleted = await WhatWeDo.findByIdAndDelete(context.params.id);

    if (!deleted)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
