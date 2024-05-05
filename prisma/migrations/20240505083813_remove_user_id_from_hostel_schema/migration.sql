-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_userId_fkey";

-- AlterTable
ALTER TABLE "Hostel" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Gallery_hostelId_idx" ON "Gallery"("hostelId");

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
