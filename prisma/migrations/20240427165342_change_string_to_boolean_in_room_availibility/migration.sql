/*
  Warnings:

  - The `oneSeater` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `twoSeater` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `threeSeater` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fourSeater` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fiveSeater` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attachBathroom` column on the `RoomAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "tole" TEXT;

-- AlterTable
ALTER TABLE "RoomAvailability" DROP COLUMN "oneSeater",
ADD COLUMN     "oneSeater" BOOLEAN,
DROP COLUMN "twoSeater",
ADD COLUMN     "twoSeater" BOOLEAN,
DROP COLUMN "threeSeater",
ADD COLUMN     "threeSeater" BOOLEAN,
DROP COLUMN "fourSeater",
ADD COLUMN     "fourSeater" BOOLEAN,
DROP COLUMN "fiveSeater",
ADD COLUMN     "fiveSeater" BOOLEAN,
DROP COLUMN "attachBathroom",
ADD COLUMN     "attachBathroom" BOOLEAN;
