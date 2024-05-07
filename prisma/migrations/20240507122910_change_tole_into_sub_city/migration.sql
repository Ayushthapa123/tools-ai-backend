/*
  Warnings:

  - You are about to drop the column `tole` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `tole` on the `SearchQueries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "tole",
ADD COLUMN     "subCity" TEXT;

-- AlterTable
ALTER TABLE "SearchQueries" DROP COLUMN "tole",
ADD COLUMN     "subCity" TEXT;
