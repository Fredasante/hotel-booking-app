// src/utils/emailHelpers.ts

import transporter from "../config/email"; // Adjust the path as needed

const sendVerificationEmail = async (to: string, verificationToken: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification",
    text: `Please verify your email address by clicking on the following link: ${verificationUrl}`,
    html: `<p>Please verify your email address by clicking on the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
};

export default sendVerificationEmail;
