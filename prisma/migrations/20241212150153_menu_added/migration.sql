-- CreateTable
CREATE TABLE "menuItem" (
    "menuItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ingredients" TEXT[],
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menuItem_pkey" PRIMARY KEY ("menuItemId")
);

-- CreateTable
CREATE TABLE "menu" (
    "menuId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "studentHostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_menuToMenuItemRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_menuToMenuItemRelation_AB_unique" ON "_menuToMenuItemRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_menuToMenuItemRelation_B_index" ON "_menuToMenuItemRelation"("B");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_studentHostelId_fkey" FOREIGN KEY ("studentHostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menuToMenuItemRelation" ADD CONSTRAINT "_menuToMenuItemRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "menu"("menuId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menuToMenuItemRelation" ADD CONSTRAINT "_menuToMenuItemRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "menuItem"("menuItemId") ON DELETE CASCADE ON UPDATE CASCADE;
