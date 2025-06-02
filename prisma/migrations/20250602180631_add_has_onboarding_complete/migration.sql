-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "hasOnboardingComplete" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Hostel_hasOnboardingComplete_idx" ON "Hostel"("hasOnboardingComplete");
