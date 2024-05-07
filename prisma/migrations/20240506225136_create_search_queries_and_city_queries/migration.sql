/*
  Warnings:

  - You are about to drop the column `district` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "district";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SearchQueries" (
    "searchQueryId" SERIAL NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "tole" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchQueries_pkey" PRIMARY KEY ("searchQueryId")
);

-- CreateTable
CREATE TABLE "CityQueries" (
    "cityQueriesId" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "CityQueries_pkey" PRIMARY KEY ("cityQueriesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchQueries_searchQueryId_key" ON "SearchQueries"("searchQueryId");

-- CreateIndex
CREATE UNIQUE INDEX "CityQueries_cityQueriesId_key" ON "CityQueries"("cityQueriesId");
