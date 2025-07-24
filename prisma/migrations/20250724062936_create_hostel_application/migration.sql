/*
  Warnings:

  - You are about to drop the column `telegramId` on the `Hostel` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED', 'PARTIALLY_PAID', 'PARTIALLY_REFUNDED', 'FAILED', 'REFUND_REQUESTED');

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "telegramId";

-- AlterTable
ALTER TABLE "HostelService" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "HostelApplicationForm" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "askForDiscount" BOOLEAN NOT NULL DEFAULT false,
    "discountPercentage" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "roomCapacity" "RoomCapacity",
    "checkinDate" TIMESTAMP(3),
    "checkoutDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "HostelApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelApplicationForm_id_key" ON "HostelApplicationForm"("id");

-- CreateIndex
CREATE INDEX "HostelApplicationForm_email_idx" ON "HostelApplicationForm"("email");

-- AddForeignKey
ALTER TABLE "HostelApplicationForm" ADD CONSTRAINT "HostelApplicationForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelApplicationForm" ADD CONSTRAINT "HostelApplicationForm_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
