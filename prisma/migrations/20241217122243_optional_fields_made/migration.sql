/*
  Warnings:

  - Added the required column `name` to the `StudentFormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentFormData" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL;
