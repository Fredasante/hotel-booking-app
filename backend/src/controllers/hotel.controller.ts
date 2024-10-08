import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel.model";

interface CustomRequest extends Request {
  userId?: string;
}

export const createMyHotel = async (req: CustomRequest, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId!;

    const hotel = new Hotel(newHotel);
    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error creating hotel: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyHotels = async (req: CustomRequest, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).send(hotels);
  } catch (error) {
    console.log("Error getting hotels: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHotelById = async (req: CustomRequest, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("Error getting hotel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateHotel = async (req: CustomRequest, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId, userId: req.userId },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(imageFiles);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
