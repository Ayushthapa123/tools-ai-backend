/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HostelSuppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suppliers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HostelSuppliers" DROP CONSTRAINT "HostelSuppliers_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "HostelSuppliers" DROP CONSTRAINT "HostelSuppliers_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "HostelSuppliers";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Suppliers";
