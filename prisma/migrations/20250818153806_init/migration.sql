-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CREATOR', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('BOYS', 'GIRLS', 'OTHERS');

-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('IO', 'CURD');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "fullName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phoneNumber" TEXT,
    "altPhoneNumber" TEXT,
    "hashedRefreshToken" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "GenderType",
    "userType" "UserType" NOT NULL DEFAULT 'USER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "slug" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "ranking" INTEGER DEFAULT 0,
    "toolType" "ToolType" NOT NULL DEFAULT 'IO',
    "visibility" "VisibilityType" NOT NULL DEFAULT 'PRIVATE',
    "ownerId" INTEGER NOT NULL,
    "verifiedBySuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InputSchema" (
    "id" SERIAL NOT NULL,
    "schema" JSONB NOT NULL,
    "toolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InputSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputSchema" (
    "id" SERIAL NOT NULL,
    "schema" JSONB NOT NULL,
    "toolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolMetadata" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageUrl" TEXT,
    "toolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_id_key" ON "Tool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_handle_key" ON "Tool"("handle");

-- CreateIndex
CREATE INDEX "Tool_id_slug_idx" ON "Tool"("id", "slug");

-- CreateIndex
CREATE INDEX "Tool_name_idx" ON "Tool"("name");

-- CreateIndex
CREATE INDEX "Tool_verifiedBySuperAdmin_idx" ON "Tool"("verifiedBySuperAdmin");

-- CreateIndex
CREATE INDEX "Tool_createdAt_idx" ON "Tool"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InputSchema_id_key" ON "InputSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InputSchema_toolId_key" ON "InputSchema"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "OutputSchema_id_key" ON "OutputSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OutputSchema_toolId_key" ON "OutputSchema"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolMetadata_id_key" ON "ToolMetadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ToolMetadata_toolId_key" ON "ToolMetadata"("toolId");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputSchema" ADD CONSTRAINT "InputSchema_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputSchema" ADD CONSTRAINT "OutputSchema_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolMetadata" ADD CONSTRAINT "ToolMetadata_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
