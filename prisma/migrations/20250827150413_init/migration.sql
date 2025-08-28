-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('FREE', 'FREEMIUM', 'PAID', 'CUSTOM', 'TRIAL');

-- CreateEnum
CREATE TYPE "AiType" AS ENUM ('GENERATIVE_AI', 'CONVERSATIONAL_AI', 'COMPUTER_VISION', 'SPEECH_AI', 'RECOMMENDATION_AI', 'AUTOMATION_AI', 'ANALYTICS_AI', 'SEARCH_RETRIEVAL_AI', 'CODE_AI', 'MARKETING_AI', 'SECURITY_AI', 'AI_AGENT', 'OTHER');

-- CreateEnum
CREATE TYPE "AiCapability" AS ENUM ('FOUNDATION_MODEL', 'GENERATIVE_TEXT', 'GENERATIVE_IMAGE', 'GENERATIVE_AUDIO', 'GENERATIVE_VIDEO', 'MULTIMODAL_UNDERSTANDING', 'NLP_UNDERSTANDING', 'SEARCH_RETRIEVAL', 'KNOWLEDGE_AI', 'COMPUTER_VISION', 'OCR_DOCUMENT_AI', 'SPEECH_ASR', 'SPEECH_TTS', 'SPEAKER_TECH', 'RECOMMENDATION', 'TIME_SERIES_FORECASTING', 'OPTIMIZATION_PLANNING', 'ANOMALY_DETECTION', 'CAUSAL_INFERENCE', 'ANALYTICS_BI', 'CODE_AI', 'SECURITY_ML', 'PRIVACY_PRESERVING_ML', 'MLOPS_OBSERVABILITY', 'SYNTHETIC_DATA', 'ROBOTICS_CONTROL', 'EDGE_AI', 'OTHER');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('MARKETING', 'DEVELOPMENT', 'BUSINESS', 'DESIGN', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'PRODUCTIVITY', 'RESEARCH', 'LEGAL', 'ENTERTAINMENT', 'CUSTOMER_SUPPORT', 'SALES', 'DATA_ANALYTICS', 'HUMAN_RESOURCES', 'SECURITY', 'OPERATIONS', 'CONTENT_CREATION', 'ECOMMERCE', 'GAMING', 'SOCIAL_MEDIA', 'VIDEO_CREATION', 'AUDIO_MUSIC', 'WRITING', 'TRANSLATION', 'IMAGE_GENERATION', 'VIRTUAL_ASSISTANT', 'AUTOMATION', 'CHATBOT', 'CLOUD', 'OTHER');

-- CreateEnum
CREATE TYPE "ToolUserType" AS ENUM ('DEVELOPER', 'SOFTWARE_ENGINEER', 'MACHINE_LEARNING_ENGINEER', 'DATA_SCIENTIST', 'AI_RESEARCHER', 'IT_PROFESSIONAL', 'CLOUD_ENGINEER', 'DEVOPS_ENGINEER', 'CYBERSECURITY_SPECIALIST', 'QA_ENGINEER', 'ENTREPRENEUR', 'BUSINESS_OWNER', 'PRODUCT_MANAGER', 'PROJECT_MANAGER', 'BUSINESS_ANALYST', 'CONSULTANT', 'SALES_PROFESSIONAL', 'CUSTOMER_SUPPORT_AGENT', 'OPERATIONS_MANAGER', 'STRATEGY_PLANNER', 'MARKETER', 'DIGITAL_MARKETER', 'SEO_SPECIALIST', 'SOCIAL_MEDIA_MANAGER', 'BRAND_MANAGER', 'ADVERTISING_SPECIALIST', 'DESIGNER', 'GRAPHIC_DESIGNER', 'UX_UI_DESIGNER', 'VIDEO_EDITOR', 'CONTENT_CREATOR', 'WRITER', 'COPYWRITER', 'MUSIC_PRODUCER', 'ANIMATOR', 'STUDENT', 'TEACHER', 'TRAINER', 'RESEARCHER', 'EDUCATOR', 'HEALTHCARE_PROFESSIONAL', 'LEGAL_PROFESSIONAL', 'FINANCE_PROFESSIONAL', 'HR_PROFESSIONAL', 'GAMER', 'HOBBYIST', 'OTHER');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('TEXT', 'IMAGE', 'AUDIO', 'VIDEO', 'TABULAR', 'TIME_SERIES', 'GRAPH', 'THREE_D', 'MULTIMODAL');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('WEB', 'MOBILE', 'DESKTOP', 'API', 'SDK', 'WEBHOOK', 'PLUGIN', 'EXTENSION', 'OTHER');

-- CreateEnum
CREATE TYPE "Delivery" AS ENUM ('SAAS', 'API', 'SDK', 'MODEL_WEIGHTS', 'OPEN_SOURCE', 'ON_PREM', 'EDGE_DEVICE', 'MARKETPLACE_PLUGIN');

-- CreateEnum
CREATE TYPE "IntegrationOption" AS ENUM ('ZAPIER', 'INTEGROMAT', 'SLACK', 'MICROSOFT_TEAMS', 'GOOGLE_WORKSPACE', 'NOTION', 'FIGMA', 'SHOPIFY', 'WORDPRESS', 'SALESFORCE', 'HUBSPOT', 'CLOUD_DRIVE', 'IDE_PLUGIN', 'CRM', 'DATABASE', 'API_CONNECTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CREATOR', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('BOYS', 'GIRLS', 'OTHERS');

-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('IO', 'CRUD', 'LISTED_AI_TOOL');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
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
    "toolStatus" "ToolStatus" NOT NULL DEFAULT 'DRAFT',
    "verifiedBySuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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

-- CreateTable
CREATE TABLE "ListedAiTool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "toolUserTypes" "ToolUserType"[] DEFAULT ARRAY[]::"ToolUserType"[],
    "pricingType" "PricingType"[],
    "aiType" "AiType"[] DEFAULT ARRAY[]::"AiType"[],
    "aiCapabilities" "AiCapability"[] DEFAULT ARRAY[]::"AiCapability"[],
    "modalities" "Modality"[] DEFAULT ARRAY[]::"Modality"[],
    "delivery" "Delivery"[] DEFAULT ARRAY[]::"Delivery"[],
    "platforms" "PlatformType"[] DEFAULT ARRAY[]::"PlatformType"[],
    "integrationOptions" "IntegrationOption"[] DEFAULT ARRAY[]::"IntegrationOption"[],
    "domains" "Domain"[] DEFAULT ARRAY[]::"Domain"[],
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
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

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

-- CreateIndex
CREATE UNIQUE INDEX "ListedAiTool_id_key" ON "ListedAiTool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ListedAiTool_slug_key" ON "ListedAiTool"("slug");

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
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
