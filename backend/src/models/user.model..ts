import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the UserType interface
export interface UserType extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string | null;
  firstName: string;
  lastName: string;
  displayName?: string;
  profilePicture: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  nationality?: string;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  passportDetails?: {
    firstName?: string;
    lastName?: string;
    number?: string;
    expiryDate?: Date;
    issuingCountry?: string;
    consent?: boolean;
  };
}

// Define the user schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    passportDetails: {
      firstName: { type: String },
      lastName: { type: String },
      number: { type: String },
      expiryDate: { type: Date },
      issuingCountry: { type: String },
      consent: { type: Boolean },
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Create the User model
const User = mongoose.model<UserType>("User", userSchema);

export default User;
