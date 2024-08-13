/*
  Warnings:

  - You are about to drop the `HostelFeatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "SHostels" ADD COLUMN     "imgUrl" TEXT;

-- DropTable
DROP TABLE "HostelFeatures";
