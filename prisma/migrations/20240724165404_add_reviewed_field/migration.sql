/*
  Warnings:

  - You are about to drop the column `currencyId` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the `AdPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Advertisement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StayHostelCategories" AS ENUM ('COLLEGE_HOSTEL', 'SCHOOL_HOSTEL', 'PRIVATE_HOSTEL', 'PROFESSIONAL_HOSTEL', 'TRAINING_HOSTEL', 'BOARDING_HOSTEL', 'KIDS_HOSTEL', 'ADULTS_ONLY_HOSTEL', 'BUDGET_FRIENDLY', 'PREMIUM');

-- CreateEnum
CREATE TYPE "TravelHostelCategories" AS ENUM ('BUDGET_FRIENDLY', 'PREMIUM', 'PARTY', 'YOUTH', 'ECO_FRIENDLY', 'UNIQUELY_THEMED', 'TOURIST_ONLY', 'COMMUNITY_BASED');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('ALL', 'STUDENTS_ONLY', 'ONLY_ME');

-- CreateEnum
CREATE TYPE "Badges" AS ENUM ('NEW', 'PEOPLES_CHOICE', 'FAMOUS', 'GOOD_FOOD', 'GOOD_LOCATION', 'SOCIAL_BUTTERFLY', 'TECH_SAVVY');

-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_adPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_adPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_hostelId_fkey";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "currencyId",
ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "AdPlan";

-- DropTable
DROP TABLE "Advertisement";

-- DropTable
DROP TABLE "Payments";

-- CreateTable
CREATE TABLE "HostelSettings" (
    "hostelSettingId" SERIAL NOT NULL,
    "currency" TEXT,
    "fontSize" INTEGER NOT NULL DEFAULT 14,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deActivate" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "VisibilityType" NOT NULL DEFAULT 'ALL',
    "allowBooking" BOOLEAN NOT NULL DEFAULT false,
    "allowComments" BOOLEAN NOT NULL DEFAULT false,
    "allowPrivateFeedbacks" BOOLEAN NOT NULL DEFAULT false,
    "allowMessages" BOOLEAN NOT NULL DEFAULT false,
    "allowRating" BOOLEAN NOT NULL DEFAULT false,
    "badges" "Badges"[] DEFAULT ARRAY[]::"Badges"[],
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "HostelSettings_pkey" PRIMARY KEY ("hostelSettingId")
);

-- CreateTable
CREATE TABLE "NearbyPlace" (
    "nearbyPlaceId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "NearbyPlace_pkey" PRIMARY KEY ("nearbyPlaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelSettings_hostelSettingId_key" ON "HostelSettings"("hostelSettingId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSettings_hostelId_key" ON "HostelSettings"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "NearbyPlace_nearbyPlaceId_key" ON "NearbyPlace"("nearbyPlaceId");

-- AddForeignKey
ALTER TABLE "HostelSettings" ADD CONSTRAINT "HostelSettings_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearbyPlace" ADD CONSTRAINT "NearbyPlace_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
