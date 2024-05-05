-- CreateEnum
CREATE TYPE "HostelType" AS ENUM ('STAY', 'TRAVELS', 'BOTH');

-- AlterEnum
ALTER TYPE "GalleryType" ADD VALUE 'FOOD';

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "hostelType" "HostelType" NOT NULL DEFAULT 'STAY';

-- AlterTable
ALTER TABLE "HostelFeatures" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "MonthlyPricing" ADD COLUMN     "admission" INTEGER,
ADD COLUMN     "deposite" INTEGER;

-- CreateTable
CREATE TABLE "HostelRules" (
    "hostelRulesId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "HostelRules_pkey" PRIMARY KEY ("hostelRulesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_hostelRulesId_key" ON "HostelRules"("hostelRulesId");
