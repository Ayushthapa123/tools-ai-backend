-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'HOSTEL_OWNER', 'SUPPLIERS', 'SUPERADMIN', 'OTHERS');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('BOYS', 'GIRLS', 'BOTH');

-- CreateEnum
CREATE TYPE "HostelType" AS ENUM ('STAY', 'TRAVELS', 'BOTH');

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

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "hostelId" INTEGER,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "fullName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phoneNumber" TEXT,
    "hashedRefreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userPlan" "SubscriptionPlans" NOT NULL DEFAULT 'FREE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userType" "UserType" NOT NULL DEFAULT 'HOSTEL_OWNER',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Hostel" (
    "hostelId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "ranking" INTEGER DEFAULT 0,
    "genderType" "GenderType" NOT NULL,
    "hostelType" "HostelType" NOT NULL DEFAULT 'STAY',
    "capacity" INTEGER,
    "availableSeats" INTEGER,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "whatsappId" TEXT,
    "telegramId" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("hostelId")
);

-- CreateTable
CREATE TABLE "MonthlyPricing" (
    "monthlyPricingId" SERIAL NOT NULL,
    "oneSeater" INTEGER,
    "twoSeater" INTEGER,
    "threeSeater" INTEGER,
    "fourSeater" INTEGER,
    "fiveSeater" INTEGER,
    "attachBathroom" INTEGER,
    "deposite" INTEGER,
    "admission" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyPricing_pkey" PRIMARY KEY ("monthlyPricingId")
);

-- CreateTable
CREATE TABLE "DailyPricing" (
    "dailyPricingId" SERIAL NOT NULL,
    "oneSeater" INTEGER,
    "twoSeater" INTEGER,
    "threeSeater" INTEGER,
    "fourSeater" INTEGER,
    "fiveSeater" INTEGER,
    "attachBathroom" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "DailyPricing_pkey" PRIMARY KEY ("dailyPricingId")
);

-- CreateTable
CREATE TABLE "RoomAvailability" (
    "roomAvailabilityId" SERIAL NOT NULL,
    "oneSeater" BOOLEAN,
    "twoSeater" BOOLEAN,
    "threeSeater" BOOLEAN,
    "fourSeater" BOOLEAN,
    "fiveSeater" BOOLEAN,
    "attachBathroom" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "RoomAvailability_pkey" PRIMARY KEY ("roomAvailabilityId")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "galleryId" SERIAL NOT NULL,
    "type" "GalleryType" NOT NULL DEFAULT 'ROOM',
    "caption" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("galleryId")
);

-- CreateTable
CREATE TABLE "Socials" (
    "socialsId" SERIAL NOT NULL,
    "instaGram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "map" TEXT,
    "youTube" TEXT,
    "hostelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("socialsId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "subCity" TEXT,
    "street" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "SearchQueries" (
    "searchQueryId" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchQueries_pkey" PRIMARY KEY ("searchQueryId")
);

-- CreateTable
CREATE TABLE "ContactDetails" (
    "contactId" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "ContactDetails_pkey" PRIMARY KEY ("contactId")
);

-- CreateTable
CREATE TABLE "HostelSettings" (
    "hostelSettingId" SERIAL NOT NULL,
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

    CONSTRAINT "HostelSettings_pkey" PRIMARY KEY ("hostelSettingId")
);

-- CreateTable
CREATE TABLE "NearbyPlace" (
    "nearbyPlaceId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "NearbyPlace_pkey" PRIMARY KEY ("nearbyPlaceId")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "amenitiesId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("amenitiesId")
);

-- CreateTable
CREATE TABLE "Services" (
    "servicesId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("servicesId")
);

-- CreateTable
CREATE TABLE "HostelRules" (
    "rulesId" SERIAL NOT NULL,
    "hostelId" INTEGER NOT NULL,
    "rules" TEXT NOT NULL,

    CONSTRAINT "HostelRules_pkey" PRIMARY KEY ("rulesId")
);

-- CreateTable
CREATE TABLE "SHostels" (
    "sHostelsId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "contact" TEXT,
    "hostelType" "HostelType" DEFAULT 'STAY',
    "genderType" "GenderType",
    "ranking" INTEGER DEFAULT 1,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT,
    "street" TEXT,
    "imgUrl" TEXT,
    "originalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SHostels_pkey" PRIMARY KEY ("sHostelsId")
);

-- CreateTable
CREATE TABLE "GoogleMapLocation" (
    "googleMapLocationId" SERIAL NOT NULL,
    "description" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "GoogleMapLocation_pkey" PRIMARY KEY ("googleMapLocationId")
);

-- CreateTable
CREATE TABLE "FoodMenu" (
    "foodMenuId" SERIAL NOT NULL,
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

    CONSTRAINT "FoodMenu_pkey" PRIMARY KEY ("foodMenuId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_hostelId_key" ON "Users"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_hostelId_key" ON "Hostel"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_slug_key" ON "Hostel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_userId_key" ON "Hostel"("userId");

-- CreateIndex
CREATE INDEX "Hostel_hostelId_slug_idx" ON "Hostel"("hostelId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPricing_monthlyPricingId_key" ON "MonthlyPricing"("monthlyPricingId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPricing_hostelId_key" ON "MonthlyPricing"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyPricing_dailyPricingId_key" ON "DailyPricing"("dailyPricingId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyPricing_hostelId_key" ON "DailyPricing"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAvailability_roomAvailabilityId_key" ON "RoomAvailability"("roomAvailabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAvailability_hostelId_key" ON "RoomAvailability"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_galleryId_key" ON "Gallery"("galleryId");

-- CreateIndex
CREATE INDEX "Gallery_hostelId_idx" ON "Gallery"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Socials_socialsId_key" ON "Socials"("socialsId");

-- CreateIndex
CREATE UNIQUE INDEX "Socials_hostelId_key" ON "Socials"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_addressId_key" ON "Address"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_hostelId_key" ON "Address"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchQueries_searchQueryId_key" ON "SearchQueries"("searchQueryId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_contactId_key" ON "ContactDetails"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_hostelId_key" ON "ContactDetails"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSettings_hostelSettingId_key" ON "HostelSettings"("hostelSettingId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelSettings_hostelId_key" ON "HostelSettings"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "NearbyPlace_nearbyPlaceId_key" ON "NearbyPlace"("nearbyPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_amenitiesId_key" ON "Amenities"("amenitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_hostelId_key" ON "Amenities"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_servicesId_key" ON "Services"("servicesId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_hostelId_key" ON "Services"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_rulesId_key" ON "HostelRules"("rulesId");

-- CreateIndex
CREATE UNIQUE INDEX "HostelRules_hostelId_key" ON "HostelRules"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "SHostels_sHostelsId_key" ON "SHostels"("sHostelsId");

-- CreateIndex
CREATE UNIQUE INDEX "SHostels_slug_key" ON "SHostels"("slug");

-- CreateIndex
CREATE INDEX "SHostels_slug_sHostelsId_idx" ON "SHostels"("slug", "sHostelsId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleMapLocation_googleMapLocationId_key" ON "GoogleMapLocation"("googleMapLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleMapLocation_hostelId_key" ON "GoogleMapLocation"("hostelId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodMenu_foodMenuId_key" ON "FoodMenu"("foodMenuId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodMenu_day_key" ON "FoodMenu"("day");

-- CreateIndex
CREATE INDEX "FoodMenu_hostelId_foodMenuId_idx" ON "FoodMenu"("hostelId", "foodMenuId");

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPricing" ADD CONSTRAINT "MonthlyPricing_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyPricing" ADD CONSTRAINT "DailyPricing_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAvailability" ADD CONSTRAINT "RoomAvailability_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDetails" ADD CONSTRAINT "ContactDetails_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelSettings" ADD CONSTRAINT "HostelSettings_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearbyPlace" ADD CONSTRAINT "NearbyPlace_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelRules" ADD CONSTRAINT "HostelRules_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleMapLocation" ADD CONSTRAINT "GoogleMapLocation_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMenu" ADD CONSTRAINT "FoodMenu_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("hostelId") ON DELETE RESTRICT ON UPDATE CASCADE;
