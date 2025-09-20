-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "toolId" INTEGER,
    "listedAiToolId" INTEGER,
    "toolType" "ToolType" NOT NULL DEFAULT 'IO',
    "userId" INTEGER,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE INDEX "Comment_toolId_idx" ON "Comment"("toolId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_listedAiToolId_idx" ON "Comment"("listedAiToolId");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE INDEX "Comment_updatedAt_idx" ON "Comment"("updatedAt");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_listedAiToolId_fkey" FOREIGN KEY ("listedAiToolId") REFERENCES "ListedAiTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
