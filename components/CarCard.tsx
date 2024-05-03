"use client";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { CardCardProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CarCard = ({ car }: CardCardProps) => {
  const pathname = usePathname();

  return (
    <div className="w-full h-fit  max-w-lg mx-auto bg-white dark:bg-gradient-radial from-slate-700 to-slate-900 dark:border-slate-700/70 md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl border group  group-hover:scale-125">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold capitalize truncate max-w-[75%]">
          {car.carTitle}
        </h1>
      </div>
      <p className="text-gray-400 capitalize mt-1">{car.typeOfclass}</p>

      <div className="relative w-full h-48 rounded-lg mt-1">
        <Image
          src={car.imageFiles[1] || car.imageFiles[0]}
          alt="car"
          fill
          className="object-contain absolute w-full rounded-lg "
        />
      </div>
      <div className="w-full mt-2 p-2 h-fit">
        <div className="flex w-full items-center justify-between ">
          <div className="flex  items-center justify-center gap-1">
            <Image
              src={"/icons/steering-wheel.svg"}
              alt="steering wheel"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm">Manual</span>
          </div>
          <div className="flex  items-center justify-center gap-1">
            <Image
              src={"/icons/fuel-tank.svg"}
              alt="fuel-tank"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm">{car.fuelCapacity}L</span>
          </div>
          <div className="flex  items-center justify-center gap-1">
            <Image
              src={"/icons/people.svg"}
              alt="people"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm ">
              {car.capacity} People
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="relative ">
            <span className="absolute top-0 text-xs font-bold">$</span>
            <span className="text-lg md:text-2xl font-bold text-center ml-2">
              {car.rentPrice?.toFixed(2)}
            </span>
            <span className="absolute bottom-0 text-xs font-bold">/day</span>
          </div>
          <Link href={`/cars/${car.id}`}>
            <CustomButton
              title="More Info"
              type="button"
              containerStyle="bg-blue-600 text-white w-full px-5 rounded-full dark:bg-slate-700 dark:text-slate-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
