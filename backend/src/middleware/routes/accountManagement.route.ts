import express from "express";
import * as accountController from "../../controllers/accountManagement.controller";
import { validateProfileUpdate } from "../validation";
import verifyToken from "../auth";

const router = express.Router();

router.get("/profile", verifyToken, accountController.getUserDetails);

router.put(
  "/profile",
  verifyToken,
  validateProfileUpdate,
  accountController.updateProfile
);

export default router;
