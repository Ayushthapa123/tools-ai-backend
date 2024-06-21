/*
  Warnings:

  - You are about to drop the column `verified` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlans" AS ENUM ('FREE', 'PRO', 'PREMIUM');

-- DropIndex
DROP INDEX "Hostel_userId_hostelId_slug_idx";

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "scrapped" BOOLEAN;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "verified",
ADD COLUMN     "userPlan" "SubscriptionPlans" NOT NULL DEFAULT 'FREE';

-- CreateIndex
CREATE INDEX "Hostel_hostelId_slug_idx" ON "Hostel"("hostelId", "slug");
