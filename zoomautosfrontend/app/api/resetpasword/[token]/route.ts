
import connectDB from "@/app/lib/db";
import registration from "@/app/models/registration";

export default async function handler(req:any, res:any) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query;
  const { password } = req.body;

  try {
    // Find user with the reset token
    const user = await registration.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Update password (plain text)
    user.password = password;

    // Clear reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password successfully reset." });
  } catch (error:any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
