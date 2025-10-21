import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import registration from "@/app/models/registration";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  const user = await registration.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Generate token (no expiry)
  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  await user.save();

    // Create reset link
    const resetLink = `https://zoomautos.co.uk/reset-password/${token}`;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMINEMAIL,
        pass: process.env.ADMINEMAIL_PASSWORD
      },
      tls: { ciphers: "SSLv3" },
      requireTLS: true
    });

    const mailOptions = {
      from: process.env.ADMINEMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
<title>Reset Your Password</title>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style type="text/css">
@import url('http://fonts.googleapis.com/icon?family=Material+Icons');

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.logo img {
    max-width: 400px;
    height: auto;
    margin-bottom: 20px;
    margin-top: 20px;
}

.header {
    background-color: #01103b;
    color: #ffffff;
    padding: 15px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
}

.content {
    padding: 20px;
    font-size: 16px;
    color: #333333;
}

.button {
    display: inline-block;
    background-color: #01103b;
    color: #ffffff;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20px;
}

a {
    text-decoration: none !important;
    color: #fff !important;
}

.footer {
    font-size: 14px;
    color: #888888;
    padding: 15px;
    border-top: 1px solid #dddddd;
    margin-top: 20px;
    text-align: center;
}

.footer-icons {
    margin-top: 10px;
    text-align: center;
}

.footer-icons table {
    margin: 0 auto; /* Centers the table */
}

.footer-icons td {
    padding: 5px 15px; /* Adds spacing between icons */
}

.footer-icons a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #01103b;
    font-size: 16px;
    gap: 8px; /* Space between icon and text */
}

.footer-icons img {
    width: 24px;
    height: auto;
    vertical-align: middle;
}

/* ✅ EMAIL COMPATIBILITY FIX */
@media screen and (max-width: 600px) {
    .footer-icons {
        flex-direction: column;
        gap: 10px;
    }
}
</style>

</head>
<body>

        
    <div class="container">
    <div class="header">Password Reset Request</div>    
    <!-- Logo -->
        <div class="logo">
            <img src="http://res.cloudinary.com/db2so7dyd/image/upload/v1740368096/upfwvhtd23yoshr2ikhi.png" alt="Logo">
        </div>
        
        <!-- Header -->
        
        <!-- Content -->
        <div class="content">
            <p>Hello,</p>
            <p>You recently requested to reset your password. Click the button below to proceed:</p>
            
            <a href="${resetLink}" class="button">Reset Password</a>
            
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>For security reasons, this link will expire in 24 hours.</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
    &copy; 2025 Your Company. All Rights Reserved.
    <div class="footer-icons">
        <table role="presentation">
            <tr>
                <td>
                    <a href="mailto:support@yourcompany.com">
                        <img src="http://res.cloudinary.com/db2so7dyd/image/upload/v1740369976/p6u9g4qzr5wtf79vso8y.png" 
                             alt="Email">
                        
                    </a>
                </td>
                <td>
                    <a href="tel:+123456789">
                        <img src="http://res.cloudinary.com/db2so7dyd/image/upload/v1740371417/ygwvpwqklbcw3prejjhx.png" 
                             alt="Call">
                        
                    </a>
                </td>
            </tr>
        </table>
    </div>
</div>

    </div>
</body>
</html>

             
      `
    };

    await transporter.sendMail(mailOptions);

    
return NextResponse.json({ message: "Password reset email sent." }, { status: 200 });
}