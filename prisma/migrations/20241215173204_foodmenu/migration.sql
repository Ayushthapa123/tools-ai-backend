-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateTable
CREATE TABLE "FoodMenu" (
    "foodMenuId" SERIAL NOT NULL,
    "day" "WeekDays" NOT NULL,
    "lunch" TEXT NOT NULL,
    "dinner" TEXT NOT NULL,
    "snacks" TEXT NOT NULL,
    "lunchTime" TEXT NOT NULL,
    "snacksTime" TEXT NOT NULL,
    "dinnerTime" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodMenu_pkey" PRIMARY KEY ("foodMenuId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodMenu_foodMenuId_key" ON "FoodMenu"("foodMenuId");

-- CreateIndex
CREATE INDEX "FoodMenu_hostelId_foodMenuId_idx" ON "FoodMenu"("hostelId", "foodMenuId");

-- AddForeignKey
ALTER TABLE "FoodMenu" ADD CONSTRAINT "FoodMenu_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
