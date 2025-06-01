-- CreateEnum
CREATE TYPE "HostelAmenityType" AS ENUM ('PROPERTY_ESSENTIALS', 'ROOM_ESSENTIALS', 'BATHROOM_ESSENTIALS', 'KITCHEN_ESSENTIALS', 'SAFETY_AND_HYGENE_ESSENTIALS', 'OTHER');

-- CreateTable
CREATE TABLE "AmenityOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,
    "hostelAmenityType" "HostelAmenityType" NOT NULL,

    CONSTRAINT "AmenityOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAmenityOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "RoomAmenityOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "ServiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmenityOption_id_key" ON "AmenityOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAmenityOption_id_key" ON "RoomAmenityOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOption_id_key" ON "ServiceOption"("id");
