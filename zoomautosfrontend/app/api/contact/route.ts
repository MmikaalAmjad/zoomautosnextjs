import connectDB from "@/app/lib/db";
import { isTokenValid } from "@/app/lib/authmiddlewere";
import { NextRequest, NextResponse } from "next/server";
import Contact from "@/app/models/logisticscontact";
// GET Contact
export async function GET() {
  try {
    await connectDB();
    const contact = await Contact.findOne();
    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(contact, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PUT Contact
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
const decoded = await isTokenValid(req);
  if (!decoded) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

    const { contactNo } = await req.json();

    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact({ contactNo });
    } else {
      contact.contactNo = contactNo;
    }
    await contact.save();
    return NextResponse.json({ message: "Contact number updated successfully", contact }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
