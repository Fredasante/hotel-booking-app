import express from "express";
import * as accountController from "../controllers/accountManagement.controller";
import { validateProfileUpdate } from "../middleware/validation";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/profile", verifyToken, accountController.getUserDetails);

router.put(
  "/profile",
  verifyToken,
  validateProfileUpdate,
  accountController.updateProfile
);

export default router;
