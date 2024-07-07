import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
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
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d", // 1 day in milliseconds
      }
    );
    // Set the token as an HTTP-only cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    // Send success response
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("auth_token");

  res.status(200).json({ message: "Logged out successfully" });
};
