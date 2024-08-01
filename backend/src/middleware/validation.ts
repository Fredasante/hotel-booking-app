import { body } from "express-validator";

export const validateProfileUpdate = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("displayName").trim().optional(),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phoneNumber")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date of birth"),
  body("nationality").optional().isString().withMessage("Invalid nationality"),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage("Invalid gender"),
  body("address.street").optional().isString(),
  body("address.city").optional().isString(),
  body("address.state").optional().isString(),
  body("address.postalCode").optional().isString(),
  body("address.country").optional().isString(),
  body("passportDetails.number").optional().isString(),
  body("passportDetails.expiryDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid passport expiry date"),
  body("passportDetails.issuingCountry").optional().isString(),
];
