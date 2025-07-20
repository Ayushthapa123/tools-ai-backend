-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOSTEL_SELL_FORM', 'HOSTEL_SEARCH_FORM');

-- AlterTable
ALTER TABLE "HostelService" ALTER COLUMN "priority" SET DEFAULT 'HIGH',
ALTER COLUMN "status" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GenericAddress" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "street" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "addressType" "AddressType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenericAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostelSellForm" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "hostelName" TEXT NOT NULL,
    "hostelDescription" TEXT,
    "hostelType" "HostelType" NOT NULL,
    "hostelGenderType" "HostelGenderType" NOT NULL,
    "hostelCapacity" INTEGER,
    "hostelImageUrl" TEXT,
    "sellingPrice" INTEGER,
    "addressId" INTEGER,
    "hostelId" INTEGER,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostelSellForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenericAddress_id_key" ON "GenericAddress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSellForm_id_key" ON "HostelSellForm"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSellForm_addressId_key" ON "HostelSellForm"("addressId");

-- AddForeignKey
ALTER TABLE "HostelSellForm" ADD CONSTRAINT "HostelSellForm_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "GenericAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
