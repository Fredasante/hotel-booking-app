import express from "express";
import verifyToken from "../middleware/auth";
import { createMyHotel } from "../controllers/hotel.controller";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

router.post(
  "/create",
  upload.array("imageFiles", 6),
  verifyToken,
  createMyHotel
);

export default router;
