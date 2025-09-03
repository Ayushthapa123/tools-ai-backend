-- CreateEnum
CREATE TYPE "ListedBy" AS ENUM ('GEMENAI', 'USER', 'GPT');

-- AlterTable
ALTER TABLE "ListedAiTool" ADD COLUMN     "listedBy" "ListedBy" NOT NULL DEFAULT 'GEMENAI',
ADD COLUMN     "usps" TEXT[] DEFAULT ARRAY[]::TEXT[];
