/*
  Warnings:

  - A unique constraint covering the columns `[hostelId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "currencyId" INTEGER;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "hostelId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Users_hostelId_key" ON "Users"("hostelId");
