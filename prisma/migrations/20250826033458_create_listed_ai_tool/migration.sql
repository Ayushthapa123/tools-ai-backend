/*
  Warnings:

  - The values [CURD] on the enum `ToolType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deletedAt` on the `Tool` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('FREE', 'FREEMIUM', 'PAID', 'CUSTOM', 'TRIAL');

-- CreateEnum
CREATE TYPE "AiType" AS ENUM ('GENERATIVE_AI', 'CONVERSATIONAL_AI', 'COMPUTER_VISION', 'SPEECH_AI', 'RECOMMENDATION_AI', 'AUTOMATION_AI', 'ANALYTICS_AI', 'SEARCH_RETRIEVAL_AI', 'CODE_AI', 'MARKETING_AI', 'SECURITY_AI');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('WEB', 'MOBILE', 'DESKTOP');

-- AlterEnum
BEGIN;
CREATE TYPE "ToolType_new" AS ENUM ('IO', 'CRUD', 'LISTED_AI_TOOL');
ALTER TABLE "Tool" ALTER COLUMN "toolType" DROP DEFAULT;
ALTER TABLE "Tool" ALTER COLUMN "toolType" TYPE "ToolType_new" USING ("toolType"::text::"ToolType_new");
ALTER TABLE "Like" ALTER COLUMN "toolType" TYPE "ToolType_new" USING ("toolType"::text::"ToolType_new");
ALTER TYPE "ToolType" RENAME TO "ToolType_old";
ALTER TYPE "ToolType_new" RENAME TO "ToolType";
DROP TYPE "ToolType_old";
ALTER TABLE "Tool" ALTER COLUMN "toolType" SET DEFAULT 'IO';
COMMIT;

-- DropForeignKey
ALTER TABLE "InputSchema" DROP CONSTRAINT "InputSchema_toolId_fkey";

-- DropForeignKey
ALTER TABLE "OutputSchema" DROP CONSTRAINT "OutputSchema_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolMetadata" DROP CONSTRAINT "ToolMetadata_toolId_fkey";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "deletedAt",
ADD COLUMN     "toolStatus" "ToolStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "ListedAiTool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "pricingType" "PricingType" NOT NULL,
    "aiType" "AiType" NOT NULL,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "platforms" "PlatformType"[] DEFAULT ARRAY[]::"PlatformType"[],
    "integrationOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "popularityScore" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "useCases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListedAiTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "toolId" INTEGER,
    "listedAiToolId" INTEGER,
    "toolType" "ToolType" NOT NULL DEFAULT 'IO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListedAiTool_id_key" ON "ListedAiTool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE INDEX "Like_toolId_idx" ON "Like"("toolId");

-- CreateIndex
CREATE INDEX "Like_listedAiToolId_idx" ON "Like"("listedAiToolId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_toolId_key" ON "Like"("userId", "toolId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_listedAiToolId_key" ON "Like"("userId", "listedAiToolId");

-- AddForeignKey
ALTER TABLE "InputSchema" ADD CONSTRAINT "InputSchema_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputSchema" ADD CONSTRAINT "OutputSchema_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolMetadata" ADD CONSTRAINT "ToolMetadata_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListedAiTool" ADD CONSTRAINT "ListedAiTool_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_listedAiToolId_fkey" FOREIGN KEY ("listedAiToolId") REFERENCES "ListedAiTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
