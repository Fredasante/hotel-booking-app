import { Request, Response } from "express";
import User from "../models/user.model.";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/emailHelpers";

export const registerUser = async (req: Request, res: Response) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, firstName, lastName, password });

    // Generate a JWT token for authentication
    const authToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    // Generate a verification token
    const verificationToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_VERIFICATION_KEY as string,
      { expiresIn: "1h" }
    );

    // Save the verification token to the user's record
    newUser.verificationToken = verificationToken;
    await newUser.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    // Set the auth token as an HTTP-only cookie
    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });

    // Send success response
    return res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration" });
  }
};

// custom login
export const login = async (req: Request, res: Response) => {
  // validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    const { password: pass, ...rest } = user.toObject();

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// google login
export const google = async (req: Request, res: Response) => {
  const { displayName, email, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8);

      user = new User({
        email,
        displayName,
        firstName: displayName.split(" ")[0],
        lastName: displayName.split(" ")[1] || "",
        profilePicture: photoURL,
        password: generatedPassword,
      });

      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    const { password, ...rest } = user.toObject();

    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("auth_token");

  res.status(200).json({ message: "Logged out successfully" });
};

// verify email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token or user does not exist" });
    }

    // Check if the token matches the one saved on the user's record
    if (user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update user's email verification status
    user.isVerified = true;
    user.verificationToken = null; // Clear the verification token
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
