/*
  Warnings:

  - You are about to drop the column `dataSource` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `scrapped` on the `Hostel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `SHostels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `SHostels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DataSources" AS ENUM ('OWNER', 'GOOGLE', 'FACEBOOK', 'SCRAPPED', 'OTHERS');

-- AlterEnum
ALTER TYPE "GalleryType" ADD VALUE 'LOGO';

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "dataSource",
DROP COLUMN "scrapped";

-- AlterTable
ALTER TABLE "SHostels" ADD COLUMN     "genderType" "GenderType",
ADD COLUMN     "hostelType" "HostelType" DEFAULT 'STAY',
ADD COLUMN     "slug" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DataSource";

-- CreateIndex
CREATE UNIQUE INDEX "SHostels_slug_key" ON "SHostels"("slug");

-- CreateIndex
CREATE INDEX "SHostels_slug_sHostelsId_idx" ON "SHostels"("slug", "sHostelsId");
