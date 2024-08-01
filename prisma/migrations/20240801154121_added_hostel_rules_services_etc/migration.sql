/*
  Warnings:

  - The primary key for the `HostelRules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `HostelRules` table. All the data in the column will be lost.
  - You are about to drop the column `hostelRulesId` on the `HostelRules` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `HostelRules` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `NearbyPlace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rulesId]` on the table `HostelRules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostelId]` on the table `HostelRules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hostelId` to the `HostelRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rules` to the `HostelRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HostelSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HostelRules_hostelRulesId_key";

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "ranking" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "HostelRules" DROP CONSTRAINT "HostelRules_pkey",
DROP COLUMN "description",
DROP COLUMN "hostelRulesId",
DROP COLUMN "name",
ADD COLUMN     "hostelId" INTEGER NOT NULL,
ADD COLUMN     "rules" TEXT NOT NULL,
ADD COLUMN     "rulesId" SERIAL NOT NULL,
ADD CONSTRAINT "HostelRules_pkey" PRIMARY KEY ("rulesId");

-- AlterTable
ALTER TABLE "HostelSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NearbyPlace" DROP COLUMN "distance";

-- CreateTable
CREATE TABLE "Amenities" (
    "amenitiesId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("amenitiesId")
);

-- CreateTable
CREATE TABLE "Services" (
    "servicesId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("servicesId")
);

-- CreateTable
CREATE TABLE "SHostels" (
    "sHostelsId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "contact" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "street" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SHostels_pkey" PRIMARY KEY ("sHostelsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_amenitiesId_key" ON "Amenities"("amenitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_hostelId_key" ON "Amenities"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_servicesId_key" ON "Services"("servicesId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_hostelId_key" ON "Services"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "SHostels_sHostelsId_key" ON "SHostels"("sHostelsId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_rulesId_key" ON "HostelRules"("rulesId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_hostelId_key" ON "HostelRules"("hostelId");

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelRules" ADD CONSTRAINT "HostelRules_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
