import { NextRequest } from "next/server";

import connectDB from "@/app/lib/db";

import Logos from "@/app/models/logos";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const fetchImageBuffer = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
};

// GET /api/logos
export async function GET() {
  try {
    await connectDB();
    const logos = await Logos.find();
    return new Response(JSON.stringify(logos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
// POST /api/logos
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, Image } = await req.json();
    const newLogos = new Logos({ title, Image });
    const savedLogos = await newLogos.save();

    // Create PDF
    const pdfPath = "./Checklogo.pdf";
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    doc.fontSize(18).text(`Logos Title: ${title}`, { align: "center" });
    doc.moveDown();

    for (const url of Image) {
      try {
        const buffer = await fetchImageBuffer(url);
        doc.image(buffer, { fit: [300, 300], align: "center" });
        doc.moveDown();
      } catch (error) {
        console.error(`Failed to fetch image: ${url}`, error);
      }
    }

    doc.end();
await new Promise<void>((resolve) => writeStream.once("finish", () => resolve()));


    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "zohaqaiser41@gmail.com",
      subject: "New Company Added",
      html: `<p>A new Logos has been submitted with the title:</p><p><strong>${title}</strong></p><p>The PDF document is attached with this email.</p>`,
      attachments: [{ filename: "Check.pdf", path: pdfPath }],
    });

    fs.unlinkSync(pdfPath);

    return new Response(JSON.stringify(savedLogos), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE /api/logos?id=LOGO_ID
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID missing" }), { status: 400 });

    const logo = await Logos.findById(id);
    if (!logo) return new Response(JSON.stringify({ error: "Logo not found" }), { status: 404 });

    // Delete from Cloudinary
    const imageUrl = logo.Image[0];
    const urlParts = imageUrl.split("/");
    const fileName = urlParts.pop()!.split(".")[0];
    const folder = urlParts.slice(7).join("/");
    const publicId = `${folder}/${fileName}`;
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await Logos.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Logo deleted successfully" }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
