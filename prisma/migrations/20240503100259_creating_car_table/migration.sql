-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carTitle` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `rentPrice` DOUBLE NOT NULL,
    `capacity` INTEGER NOT NULL,
    `fuelCapacity` INTEGER NOT NULL,
    `shortDescription` VARCHAR(191) NOT NULL,
    `typeOfclass` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `cylinders` INTEGER NOT NULL,
    `cityMPG` INTEGER NOT NULL,
    `combinationMPG` INTEGER NOT NULL,
    `highwayMPG` INTEGER NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `transmission` VARCHAR(191) NOT NULL,
    `fuelType` VARCHAR(191) NOT NULL,
    `carType` VARCHAR(191) NOT NULL,
    `drive` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
