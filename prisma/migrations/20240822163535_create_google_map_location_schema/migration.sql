-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "availableSeats" INTEGER;

-- AlterTable
ALTER TABLE "SHostels" ADD COLUMN     "originalUrl" TEXT,
ADD COLUMN     "ranking" INTEGER DEFAULT 1;

-- CreateTable
CREATE TABLE "GoogleMapLocation" (
    "googleMapLocationId" SERIAL NOT NULL,
    "description" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "GoogleMapLocation_pkey" PRIMARY KEY ("googleMapLocationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleMapLocation_googleMapLocationId_key" ON "GoogleMapLocation"("googleMapLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleMapLocation_hostelId_key" ON "GoogleMapLocation"("hostelId");

-- AddForeignKey
ALTER TABLE "GoogleMapLocation" ADD CONSTRAINT "GoogleMapLocation_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
