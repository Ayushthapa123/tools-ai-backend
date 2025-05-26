-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'HOSTEL_OWNER', 'SUPPLIERS', 'SUPERADMIN', 'COMMUNITY_OWNER', 'OTHERS');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('BOYS', 'GIRLS', 'OTHERS');

-- CreateEnum
CREATE TYPE "HostelGenderType" AS ENUM ('BOYS', 'GIRLS', 'BOTH');

-- CreateEnum
CREATE TYPE "HostelType" AS ENUM ('STAY', 'TRAVELS', 'PG', 'BOTH');

-- CreateEnum
CREATE TYPE "StayHostelCategories" AS ENUM ('COLLEGE_HOSTEL', 'SCHOOL_HOSTEL', 'PRIVATE_HOSTEL', 'PROFESSIONAL_HOSTEL', 'TRAINING_HOSTEL', 'BOARDING_HOSTEL', 'KIDS_HOSTEL', 'ADULTS_ONLY_HOSTEL', 'BUDGET_FRIENDLY', 'PREMIUM');

-- CreateEnum
CREATE TYPE "TravelHostelCategories" AS ENUM ('BUDGET_FRIENDLY', 'PREMIUM', 'PARTY', 'YOUTH', 'ECO_FRIENDLY', 'UNIQUELY_THEMED', 'TOURIST_ONLY', 'COMMUNITY_BASED');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('ALL', 'STUDENTS_ONLY', 'ONLY_ME');

-- CreateEnum
CREATE TYPE "GalleryType" AS ENUM ('PROFILE', 'COVER', 'ROOM', 'BATHROOM', 'BUILDING', 'KITCHEN', 'CELEBRATIONS', 'REVIEW', 'FOOD', 'OTHER', 'LOGO');

-- CreateEnum
CREATE TYPE "SubscriptionPlans" AS ENUM ('FREE', 'PRO', 'PREMIUM');

-- CreateEnum
CREATE TYPE "DataSources" AS ENUM ('OWNER', 'GOOGLE', 'FACEBOOK', 'SCRAPPED', 'OTHERS');

-- CreateEnum
CREATE TYPE "Badges" AS ENUM ('NEW', 'PEOPLES_CHOICE', 'FAMOUS', 'GOOD_FOOD', 'GOOD_LOCATION', 'SOCIAL_BUTTERFLY', 'TECH_SAVVY');

-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('IDLE', 'AVAILABLE', 'BOOKED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RoomCapacity" AS ENUM ('ONE_BED', 'TWO_BED', 'THREE_BED', 'FOUR_BED', 'FIVE_BED', 'SIX_BED', 'SEVEN_BED', 'EIGHT_BED', 'MULTI_BED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NPR', 'USD');

-- CreateEnum
CREATE TYPE "PaymentPlatformName" AS ENUM ('STRIPE', 'ESEWA', 'KHALTI');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "fullName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phoneNumber" TEXT,
    "altPhoneNumber" TEXT,
    "hashedRefreshToken" TEXT,
    "city" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "GenderType",
    "userType" "UserType" NOT NULL DEFAULT 'HOSTEL_OWNER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hostel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "ranking" INTEGER DEFAULT 0,
    "genderType" "HostelGenderType" NOT NULL DEFAULT 'BOTH',
    "hostelType" "HostelType" NOT NULL DEFAULT 'STAY',
    "ownerId" INTEGER NOT NULL,
    "whatsappId" TEXT,
    "telegramId" TEXT,
    "verifiedBySuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "verifiedByCommunityOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "status" "RoomStatus" NOT NULL,
    "capacity" "RoomCapacity" NOT NULL,
    "attachBathroom" BOOLEAN,
    "hostelId" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,
    "roomNumber" TEXT,
    "maxOccupancy" TEXT,
    "roomAmenityId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomImage" (
    "id" SERIAL NOT NULL,
    "caption" TEXT,
    "url" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "paymentPlatformName" "PaymentPlatformName" NOT NULL DEFAULT 'STRIPE',
    "bookingKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "baseAmountPerDay" INTEGER,
    "baseAmountPerMonth" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "isDynamicPricing" BOOLEAN NOT NULL DEFAULT false,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "discountAmount" INTEGER,
    "discountType" "DiscountType",
    "isDiscountActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicPricingRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "roomId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "isWeekend" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DynamicPricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAmenity" (
    "id" SERIAL NOT NULL,
    "amenity" JSONB NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "type" "GalleryType" NOT NULL DEFAULT 'ROOM',
    "caption" TEXT,
    "url" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "instaGram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "map" TEXT,
    "youTube" TEXT,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "street" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchQuery" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactDetail" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "email" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostelSetting" (
    "id" SERIAL NOT NULL,
    "currency" TEXT,
    "fontSize" INTEGER NOT NULL DEFAULT 14,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deActivate" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "VisibilityType" NOT NULL DEFAULT 'ALL',
    "allowBooking" BOOLEAN NOT NULL DEFAULT false,
    "allowComments" BOOLEAN NOT NULL DEFAULT false,
    "allowPrivateFeedbacks" BOOLEAN NOT NULL DEFAULT false,
    "allowMessages" BOOLEAN NOT NULL DEFAULT false,
    "allowRating" BOOLEAN NOT NULL DEFAULT false,
    "badges" "Badges"[] DEFAULT ARRAY[]::"Badges"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "HostelSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NearbyPlace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "NearbyPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "services" JSONB NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostelRules" (
    "id" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "rules" JSONB NOT NULL,

    CONSTRAINT "HostelRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodMenu" (
    "id" SERIAL NOT NULL,
    "day" "WeekDays" NOT NULL,
    "lunch" TEXT,
    "dinner" TEXT,
    "snacks" TEXT,
    "lunchTime" TEXT,
    "snacksTime" TEXT,
    "dinnerTime" TEXT,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodMenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_id_key" ON "Hostel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_slug_key" ON "Hostel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_ownerId_key" ON "Hostel"("ownerId");

-- CreateIndex
CREATE INDEX "Hostel_id_slug_idx" ON "Hostel"("id", "slug");

-- CreateIndex
CREATE INDEX "Hostel_name_idx" ON "Hostel"("name");

-- CreateIndex
CREATE INDEX "Hostel_genderType_idx" ON "Hostel"("genderType");

-- CreateIndex
CREATE INDEX "Hostel_hostelType_idx" ON "Hostel"("hostelType");

-- CreateIndex
CREATE INDEX "Hostel_verifiedBySuperAdmin_idx" ON "Hostel"("verifiedBySuperAdmin");

-- CreateIndex
CREATE INDEX "Hostel_createdAt_idx" ON "Hostel"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");

-- CreateIndex
CREATE INDEX "Room_hostelId_idx" ON "Room"("hostelId");

-- CreateIndex
CREATE INDEX "Room_status_idx" ON "Room"("status");

-- CreateIndex
CREATE UNIQUE INDEX "RoomImage_id_key" ON "RoomImage"("id");

-- CreateIndex
CREATE INDEX "RoomImage_id_idx" ON "RoomImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_id_key" ON "Booking"("id");

-- CreateIndex
CREATE INDEX "Booking_id_bookingKey_idx" ON "Booking"("id", "bookingKey");

-- CreateIndex
CREATE INDEX "Booking_startDate_endDate_idx" ON "Booking"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_guestId_idx" ON "Booking"("guestId");

-- CreateIndex
CREATE INDEX "Booking_roomId_idx" ON "Booking"("roomId");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Price_id_key" ON "Price"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Price_roomId_key" ON "Price"("roomId");

-- CreateIndex
CREATE INDEX "Price_roomId_idx" ON "Price"("roomId");

-- CreateIndex
CREATE INDEX "Price_isDynamicPricing_idx" ON "Price"("isDynamicPricing");

-- CreateIndex
CREATE INDEX "Price_isDiscountActive_idx" ON "Price"("isDiscountActive");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicPricingRule_id_key" ON "DynamicPricingRule"("id");

-- CreateIndex
CREATE INDEX "DynamicPricingRule_roomId_startDate_endDate_idx" ON "DynamicPricingRule"("roomId", "startDate", "endDate");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAmenity_id_key" ON "RoomAmenity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAmenity_roomId_key" ON "RoomAmenity"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_id_key" ON "Gallery"("id");

-- CreateIndex
CREATE INDEX "Gallery_hostelId_idx" ON "Gallery"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_id_key" ON "Social"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Social_hostelId_key" ON "Social"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_hostelId_key" ON "Address"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchQuery_id_key" ON "SearchQuery"("id");

-- CreateIndex
CREATE INDEX "SearchQuery_city_country_idx" ON "SearchQuery"("city", "country");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetail_id_key" ON "ContactDetail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetail_hostelId_key" ON "ContactDetail"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSetting_id_key" ON "HostelSetting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSetting_hostelId_key" ON "HostelSetting"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "NearbyPlace_id_key" ON "NearbyPlace"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_id_key" ON "Amenities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_hostelId_key" ON "Amenities"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_hostelId_key" ON "Service"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_id_key" ON "HostelRules"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_hostelId_key" ON "HostelRules"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodMenu_id_key" ON "FoodMenu"("id");

-- CreateIndex
CREATE INDEX "FoodMenu_hostelId_day_idx" ON "FoodMenu"("hostelId", "day");

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomImage" ADD CONSTRAINT "RoomImage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicPricingRule" ADD CONSTRAINT "DynamicPricingRule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenity" ADD CONSTRAINT "RoomAmenity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDetail" ADD CONSTRAINT "ContactDetail_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelSetting" ADD CONSTRAINT "HostelSetting_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearbyPlace" ADD CONSTRAINT "NearbyPlace_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelRules" ADD CONSTRAINT "HostelRules_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMenu" ADD CONSTRAINT "FoodMenu_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
