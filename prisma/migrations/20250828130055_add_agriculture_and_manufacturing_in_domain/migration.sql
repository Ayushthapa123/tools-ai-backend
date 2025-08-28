-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Domain" ADD VALUE 'AGRICULTURE';
ALTER TYPE "Domain" ADD VALUE 'MANUFACTURING';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Modality" ADD VALUE 'SENSOR_DATA';
ALTER TYPE "Modality" ADD VALUE 'GEOSPATIAL';

-- CreateIndex
CREATE INDEX "ListedAiTool_id_slug_idx" ON "ListedAiTool"("id", "slug");

-- CreateIndex
CREATE INDEX "ListedAiTool_name_idx" ON "ListedAiTool"("name");

-- CreateIndex
CREATE INDEX "ListedAiTool_popularityScore_idx" ON "ListedAiTool"("popularityScore");

-- CreateIndex
CREATE INDEX "ListedAiTool_featured_idx" ON "ListedAiTool"("featured");

-- CreateIndex
CREATE INDEX "ListedAiTool_createdAt_idx" ON "ListedAiTool"("createdAt");

-- CreateIndex
CREATE INDEX "ListedAiTool_updatedAt_idx" ON "ListedAiTool"("updatedAt");
