-- CreateEnum
CREATE TYPE "HostelServiceType" AS ENUM ('FACEBOOK_MARKETING', 'GOOGLE_MARKETING', 'EMPLOYEE', 'REAL_ESTATE', 'FURNITURE', 'OTHER');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MID', 'LOW');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "HostelService" (
    "id" SERIAL NOT NULL,
    "hostelServiceType" "HostelServiceType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "budget" INTEGER,
    "priority" "Priority" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "HostelService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelService_id_key" ON "HostelService"("id");

-- AddForeignKey
ALTER TABLE "HostelService" ADD CONSTRAINT "HostelService_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
