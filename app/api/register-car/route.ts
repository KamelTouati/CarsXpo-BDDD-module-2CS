import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";
import cld from "cloudinary";
import Car from "@/models/Car";
import { PrismaClient } from "@prisma/client";

const cloudinary = cld.v2;
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE_KEY,
});
export const POST = async (req: Request) => {
  // Extract fields to be saved in Prisma MySQL database
  const {
    carTitle,
    location,
    rentPrice,
    capacity,
    fuelCapacity,
    shortDescription,
    typeOfclass,
    model,
    manufacturer,
    cylinders,
    cityMPG,
    combinationMPG,
    highwayMPG,
    year,
    transmission,
    fuelType,
    carType,
    drive,
    imageFiles,
  } = await req.json();

  try {
    // Save fields in Prisma MySQL
    const savedCar = await prisma.car.create({
      data: {
        carTitle,
        location,
        rentPrice: parseFloat(rentPrice),
        capacity: parseInt(capacity),
        fuelCapacity: parseInt(fuelCapacity),
        shortDescription,
        typeOfclass,
        model,
        manufacturer,
        cylinders: parseInt(cylinders),
        cityMPG: parseInt(cityMPG),
        combinationMPG: parseInt(combinationMPG),
        highwayMPG: parseInt(highwayMPG),
        year,
        transmission,
        fuelType,
        carType,
        drive,
      },
    });

    await connectToDatabase();
    //upload all base64 of photos to cloudinary and get their urls
    const photoUploadPromises = imageFiles.map(async (base64: string) => {
      const { url } = await cloudinary.uploader.upload(base64);
      return url;
    });

    //all photos urls
    const photosUrl = await Promise.all(photoUploadPromises);
    // console.log("photosUrl:", photosUrl);

    // console.log("savedCar.id:", savedCar.id);
    
    //create new car on mongodb
    const newCar = new Car({
      carId: savedCar.id,
      imageFiles: photosUrl,
    });
    console.log("newCar:", newCar);
    
    //save new car
    await newCar.save();

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json("Failed to create a  Car", { status: 500 });
  }
};
