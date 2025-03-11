-- CreateTable
CREATE TABLE "StudentRegistration" (
    "studentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentRegistration_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "tokenId" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "studentRegistrationId" INTEGER,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "StudentFormData" (
    "studentFormDataId" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "gender" "GenderType" NOT NULL,
    "nationality" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "studentRegistrationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentFormData_pkey" PRIMARY KEY ("studentFormDataId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentRegistration_email_key" ON "StudentRegistration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_studentRegistrationId_key" ON "Tokens"("studentRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentFormData_studentRegistrationId_key" ON "StudentFormData"("studentRegistrationId");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_studentRegistrationId_fkey" FOREIGN KEY ("studentRegistrationId") REFERENCES "StudentRegistration"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFormData" ADD CONSTRAINT "StudentFormData_studentRegistrationId_fkey" FOREIGN KEY ("studentRegistrationId") REFERENCES "StudentRegistration"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
