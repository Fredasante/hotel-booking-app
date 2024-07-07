import { Request, Response } from "express";
import cloudinary from "cloudinary";

export const createMyHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;

    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = `data:${image.mimetype};base64,${b64}`;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
  } catch (error) {
    console.log("Error creating hotel: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
