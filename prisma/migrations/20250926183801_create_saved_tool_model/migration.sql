-- CreateTable
CREATE TABLE "SavedTool" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedTool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedTool_id_key" ON "SavedTool"("id");

-- CreateIndex
CREATE INDEX "SavedTool_userId_idx" ON "SavedTool"("userId");

-- CreateIndex
CREATE INDEX "SavedTool_toolId_idx" ON "SavedTool"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedTool_userId_toolId_key" ON "SavedTool"("userId", "toolId");

-- AddForeignKey
ALTER TABLE "SavedTool" ADD CONSTRAINT "SavedTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTool" ADD CONSTRAINT "SavedTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
