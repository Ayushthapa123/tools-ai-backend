/*
  Warnings:

  - The `type` column on the `Gallery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `email` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Hostel` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GalleryType" AS ENUM ('PROFILE', 'COVER', 'ROOM', 'BATHROOM', 'BUILDING', 'KITCHEN', 'CELEBRATIONS', 'REVIEW', 'OTHER');

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "type",
ADD COLUMN     "type" "GalleryType" NOT NULL DEFAULT 'ROOM';

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "email",
DROP COLUMN "phone";
