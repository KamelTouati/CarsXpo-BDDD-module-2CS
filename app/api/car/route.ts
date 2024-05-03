import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";
import Car from "@/models/Car";
import { NextRequest } from "next/server";
import { QueryProps } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all cars
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");
  const limit = searchParams.get("limit");
  const fuelType = searchParams.get("fuelType");
  const year = searchParams.get("year");
  const manufacturer = searchParams.get("manufacturer");
  try {
    let where = {}; // Define empty where object
    let take = parseInt(limit || "25"); // Parse limit as integer

    // Build the where object based on query parameters
    if (model !== "undefined") {
      where = { ...where, model };
    }
    if (fuelType !== "undefined") {
      where = { ...where, fuelType };
    }
    if (year !== "undefined") {
      where = { ...where, year };
    }
    if (manufacturer !== "undefined") {
      where = { ...where, manufacturer };
    }

    // Fetch cars from Prisma MySQL
    const cars = await prisma.car.findMany({
      where,
    });

    // Retrieve imageFiles for each car from MongoDB
    const allCars = await Promise.all(
      cars.map(async (car) => {
        const carImageFiles = await Car.findOne({ carId: car.id }).select(
          "imageFiles"
        );
        const carWithImages = {
          ...car,
          imageFiles: carImageFiles?.imageFiles || [],
        };
        return carWithImages;
      })
    );
    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json("Failed to fetch all cars", { status: 500 });
  }
};
