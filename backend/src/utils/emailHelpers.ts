// emailHelpers.ts

import nodemailer from "nodemailer";
import { getAccessToken } from "./googleAuth";

async function sendVerificationEmail(to: string, verificationLink: string) {
  const accessToken = await getAccessToken(); // Ensure this function is defined and imported correctly

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Email Verification",
    text: `Please verify your email by clicking on this link: ${verificationLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

export { sendVerificationEmail };
