-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'student';
