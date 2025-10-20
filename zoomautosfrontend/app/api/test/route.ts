import connectDB from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: "DB connected successfully" }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
