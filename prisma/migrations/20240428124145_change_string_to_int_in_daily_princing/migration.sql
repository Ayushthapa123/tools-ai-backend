/*
  Warnings:

  - The `oneSeater` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `twoSeater` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `threeSeater` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fourSeater` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fiveSeater` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attachBathroom` column on the `DailyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `oneSeater` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `twoSeater` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `threeSeater` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fourSeater` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fiveSeater` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attachBathroom` column on the `MonthlyPricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DailyPricing" DROP COLUMN "oneSeater",
ADD COLUMN     "oneSeater" INTEGER,
DROP COLUMN "twoSeater",
ADD COLUMN     "twoSeater" INTEGER,
DROP COLUMN "threeSeater",
ADD COLUMN     "threeSeater" INTEGER,
DROP COLUMN "fourSeater",
ADD COLUMN     "fourSeater" INTEGER,
DROP COLUMN "fiveSeater",
ADD COLUMN     "fiveSeater" INTEGER,
DROP COLUMN "attachBathroom",
ADD COLUMN     "attachBathroom" INTEGER;

-- AlterTable
ALTER TABLE "MonthlyPricing" DROP COLUMN "oneSeater",
ADD COLUMN     "oneSeater" INTEGER,
DROP COLUMN "twoSeater",
ADD COLUMN     "twoSeater" INTEGER,
DROP COLUMN "threeSeater",
ADD COLUMN     "threeSeater" INTEGER,
DROP COLUMN "fourSeater",
ADD COLUMN     "fourSeater" INTEGER,
DROP COLUMN "fiveSeater",
ADD COLUMN     "fiveSeater" INTEGER,
DROP COLUMN "attachBathroom",
ADD COLUMN     "attachBathroom" INTEGER;
