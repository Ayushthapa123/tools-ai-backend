/*
  Warnings:

  - A unique constraint covering the columns `[hostelSearchFormId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "BlogTags" ADD VALUE 'PLACES';

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_hostelId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "hostelSearchFormId" INTEGER,
ALTER COLUMN "hostelId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "HostelSearchForm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "occupation" TEXT,
    "hostelType" "HostelType",
    "hostelGenderType" "HostelGenderType",
    "checkinDate" TIMESTAMP(3),
    "checkoutDate" TIMESTAMP(3),
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostelSearchForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelSearchForm_id_key" ON "HostelSearchForm"("id");

-- CreateIndex
CREATE INDEX "HostelSearchForm_email_idx" ON "HostelSearchForm"("email");

-- CreateIndex
CREATE INDEX "HostelSearchForm_phoneNumber_idx" ON "HostelSearchForm"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Address_hostelSearchFormId_key" ON "Address"("hostelSearchFormId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hostelSearchFormId_fkey" FOREIGN KEY ("hostelSearchFormId") REFERENCES "HostelSearchForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelSearchForm" ADD CONSTRAINT "HostelSearchForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
