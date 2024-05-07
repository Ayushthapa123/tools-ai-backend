/*
  Warnings:

  - You are about to drop the `CityQueries` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `country` on table `SearchQueries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `SearchQueries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SearchQueries" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL;

-- DropTable
DROP TABLE "CityQueries";
