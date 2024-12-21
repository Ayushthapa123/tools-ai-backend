/*
  Warnings:

  - Changed the type of `expiresAt` on the `Tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Tokens_studentRegistrationId_key";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "expiresAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
