import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/user.model.";

interface CustomRequest extends Request {
  userId?: string;
}

export const getUserDetails = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

export const updateProfile = async (req: CustomRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      firstName,
      lastName,
      displayName,
      email,
      phoneNumber,
      dateOfBirth,
      nationality,
      gender,
      address,
      passportDetails,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        displayName,
        email,
        phoneNumber,
        dateOfBirth,
        nationality,
        gender,
        address,
        passportDetails,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
