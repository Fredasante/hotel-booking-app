import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log("Request Cookies:", req.cookies);
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
};

export default verifyToken;
