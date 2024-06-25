-- CreateEnum
CREATE TYPE "DataSource" AS ENUM ('OWNER', 'GOOGLE', 'FACEBOOK', 'OTHERS');

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "dataSource" "DataSource" NOT NULL DEFAULT 'OWNER';
