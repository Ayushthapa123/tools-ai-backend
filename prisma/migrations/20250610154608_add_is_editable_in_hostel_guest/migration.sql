-- CreateTable
CREATE TABLE "HostelGuest" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "roomId" INTEGER,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "emergencyContact" TEXT,
    "gender" "GenderType",
    "dateOfBirth" TIMESTAMP(3),
    "nationality" TEXT,
    "permanentAddress" TEXT,
    "religion" TEXT,
    "occupation" TEXT,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    "checkinDate" TIMESTAMP(3),
    "checkoutDate" TIMESTAMP(3),
    "notes" TEXT,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostelGuest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelGuest_id_key" ON "HostelGuest"("id");

-- CreateIndex
CREATE INDEX "HostelGuest_hostelId_idx" ON "HostelGuest"("hostelId");

-- CreateIndex
CREATE INDEX "HostelGuest_email_idx" ON "HostelGuest"("email");

-- CreateIndex
CREATE INDEX "HostelGuest_phoneNumber_idx" ON "HostelGuest"("phoneNumber");

-- AddForeignKey
ALTER TABLE "HostelGuest" ADD CONSTRAINT "HostelGuest_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelGuest" ADD CONSTRAINT "HostelGuest_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
