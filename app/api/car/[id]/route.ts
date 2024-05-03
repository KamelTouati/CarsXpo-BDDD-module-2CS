import { PrismaClient } from "@prisma/client"; // Import Prisma Client
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Car from "@/models/Car";

const prisma = new PrismaClient(); // Initialize Prisma Client

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    // Find car by ID using Prisma Client
    const specificCar = await prisma.car.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!specificCar) {
      return NextResponse.json("Car not found", { status: 404 });
    }

    // Retrieve imageFiles for the specific car from MongoDB
    const carImageFiles = await Car.findOne({ carId: specificCar.id }).select(
      "imageFiles"
    );

    const carWithImages = {
      ...specificCar,
      imageFiles: carImageFiles?.imageFiles || [],
    };
    
    return NextResponse.json(carWithImages, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json("Failed to get a specific car", { status: 500 });
  }
};
