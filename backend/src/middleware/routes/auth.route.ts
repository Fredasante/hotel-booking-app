import express from "express";
import {
  google,
  login,
  logout,
  registerUser,
  verifyEmail,
} from "../../controllers/auth.controller";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  login
);

router.post("/google", google);

router.post("/logout", logout);

router.get("/verify-email/:token", verifyEmail);

export default router;
