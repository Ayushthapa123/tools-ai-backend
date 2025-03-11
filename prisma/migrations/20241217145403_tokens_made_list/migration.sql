/*
  Warnings:

  - A unique constraint covering the columns `[studentRegistrationId]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.
  - Made the column `studentRegistrationId` on table `Tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_studentRegistrationId_fkey";

-- AlterTable
ALTER TABLE "Tokens" ALTER COLUMN "studentRegistrationId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_studentRegistrationId_key" ON "Tokens"("studentRegistrationId");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_studentRegistrationId_fkey" FOREIGN KEY ("studentRegistrationId") REFERENCES "StudentRegistration"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
