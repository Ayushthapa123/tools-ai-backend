/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - The `userType` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'HOSTEL_OWNER', 'SUPPLIERS');

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" SERIAL NOT NULL,
DROP COLUMN "userType",
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'STUDENT',
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Hostel" (
    "hostelId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "genderType" TEXT NOT NULL,
    "capacity" INTEGER,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "whatsappId" TEXT,
    "telegramId" TEXT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "roomAvailabilityId" INTEGER,
    "pricingId" INTEGER,
    "socialsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("hostelId")
);

-- CreateTable
CREATE TABLE "HostelFeatures" (
    "hostelFeatureId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emojiUrl" TEXT,

    CONSTRAINT "HostelFeatures_pkey" PRIMARY KEY ("hostelFeatureId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discountPercent" INTEGER,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "stockSize" INTEGER,
    "size" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "supplierId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "addressId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "HostelSuppliers" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HostelSuppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "adId" SERIAL NOT NULL,
    "adPlanId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "budgetedAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("adId")
);

-- CreateTable
CREATE TABLE "AdPlan" (
    "adPlanId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdPlan_pkey" PRIMARY KEY ("adPlanId")
);

-- CreateTable
CREATE TABLE "Payments" (
    "paymentId" SERIAL NOT NULL,
    "adPlanId" INTEGER NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "pricingId" SERIAL NOT NULL,
    "oneSeater" TEXT,
    "twoSeater" TEXT,
    "threeSeater" TEXT,
    "fourSeater" TEXT,
    "fiveSeater" TEXT,
    "attachBathroom" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("pricingId")
);

-- CreateTable
CREATE TABLE "RoomAvailability" (
    "roomAvailabilityId" SERIAL NOT NULL,
    "oneSeater" TEXT,
    "twoSeater" TEXT,
    "threeSeater" TEXT,
    "fourSeater" TEXT,
    "fiveSeater" TEXT,
    "attachBathroom" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomAvailability_pkey" PRIMARY KEY ("roomAvailabilityId")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "galleryId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "type" TEXT,
    "caption" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("galleryId")
);

-- CreateTable
CREATE TABLE "Socials" (
    "socialsId" SERIAL NOT NULL,
    "instaGram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "map" TEXT,
    "youTube" TEXT,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("socialsId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "district" TEXT,
    "city" TEXT,
    "street" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "ContactDetails" (
    "contactId" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "email" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactDetails_pkey" PRIMARY KEY ("contactId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_hostelId_key" ON "Hostel"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_slug_key" ON "Hostel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_userId_key" ON "Hostel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_addressId_key" ON "Hostel"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_contactId_key" ON "Hostel"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_roomAvailabilityId_key" ON "Hostel"("roomAvailabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_pricingId_key" ON "Hostel"("pricingId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_socialsId_key" ON "Hostel"("socialsId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelFeatures_hostelFeatureId_key" ON "HostelFeatures"("hostelFeatureId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_orderId_key" ON "Orders"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryId_key" ON "Category"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_supplierId_key" ON "Suppliers"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSuppliers_hostelId_supplierId_key" ON "HostelSuppliers"("hostelId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "Advertisement_adId_key" ON "Advertisement"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "Advertisement_adPlanId_key" ON "Advertisement"("adPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "AdPlan_adPlanId_key" ON "AdPlan"("adPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_pricingId_key" ON "Pricing"("pricingId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAvailability_roomAvailabilityId_key" ON "RoomAvailability"("roomAvailabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_galleryId_key" ON "Gallery"("galleryId");

-- CreateIndex
CREATE UNIQUE INDEX "Socials_socialsId_key" ON "Socials"("socialsId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_addressId_key" ON "Address"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_contactId_key" ON "ContactDetails"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_roomAvailabilityId_fkey" FOREIGN KEY ("roomAvailabilityId") REFERENCES "RoomAvailability"("roomAvailabilityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("pricingId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_socialsId_fkey" FOREIGN KEY ("socialsId") REFERENCES "Socials"("socialsId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "ContactDetails"("contactId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelSuppliers" ADD CONSTRAINT "HostelSuppliers_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelSuppliers" ADD CONSTRAINT "HostelSuppliers_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_adPlanId_fkey" FOREIGN KEY ("adPlanId") REFERENCES "AdPlan"("adPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_adPlanId_fkey" FOREIGN KEY ("adPlanId") REFERENCES "AdPlan"("adPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
