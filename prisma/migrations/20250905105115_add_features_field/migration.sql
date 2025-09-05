-- AlterTable
ALTER TABLE "ListedAiTool" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "ListedAiTool_publishedAt_idx" ON "ListedAiTool"("publishedAt");
