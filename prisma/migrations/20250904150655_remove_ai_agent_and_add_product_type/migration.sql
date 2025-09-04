/*
  Warnings:

  - The values [AI_AGENT] on the enum `AiType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('APPLICATION', 'MODEL', 'DATASET', 'AGENT', 'FRAMEWORK', 'TOOLKIT', 'TEMPLATE', 'SERVICE', 'HARDWARE', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "AiType_new" AS ENUM ('GENERATIVE_AI', 'CONVERSATIONAL_AI', 'COMPUTER_VISION', 'SPEECH_AI', 'RECOMMENDATION_AI', 'AUTOMATION_AI', 'ANALYTICS_AI', 'SEARCH_RETRIEVAL_AI', 'CODE_AI', 'MARKETING_AI', 'SECURITY_AI', 'OTHER');
ALTER TABLE "ListedAiTool" ALTER COLUMN "aiType" DROP DEFAULT;
ALTER TABLE "ListedAiTool" ALTER COLUMN "aiType" TYPE "AiType_new"[] USING ("aiType"::text::"AiType_new"[]);
ALTER TYPE "AiType" RENAME TO "AiType_old";
ALTER TYPE "AiType_new" RENAME TO "AiType";
DROP TYPE "AiType_old";
ALTER TABLE "ListedAiTool" ALTER COLUMN "aiType" SET DEFAULT ARRAY[]::"AiType"[];
COMMIT;

-- AlterTable
ALTER TABLE "ListedAiTool" ADD COLUMN     "productType" "ProductType"[] DEFAULT ARRAY[]::"ProductType"[];
