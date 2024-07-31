import express from "express";
import verifyToken from "../middleware/auth";
import multer from "multer";
import { createMyHotel, getMyHotels } from "../controllers/hotel.controller";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const validateHotel = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("pricePerNight")
    .notEmpty()
    .withMessage("Price per night is required")
    .isNumeric()
    .withMessage("Price per night must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
];

router.post(
  "/create",
  upload.array("imageFiles", 6),
  verifyToken,
  validateHotel,
  createMyHotel
);

router.get("/my-hotels", verifyToken, getMyHotels);

export default router;
