// src/models/hostel.model.ts

import { Badges, GenderType } from '@prisma/client';
import { HostelType, VisibilityType } from '@prisma/client';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => ID)
  userId: number;

  @Field({ nullable: true })
  hostelId?: number;

  @Field()
  email: string;

  @Field()
  passwordHash?: string;

  @Field()
  fullName: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  hashedRefreshToken?: string;

  @Field()
  isVerified?: boolean;

  //   @Field(() => UserType)
  //   userType: UserType;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}

@ObjectType()
export class Orders {
  @Field(() => ID)
  orderId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Int)
  orderNumber: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int, { nullable: true })
  discountPercent?: number;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  shippingDate: Date;

  @Field({ nullable: true })
  notes?: string;

  //   @Field(() => Hostel)
  //   hostel: Hostel;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  productId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  supplierId: number;

  @Field(() => Int, { nullable: true })
  stockSize?: number;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => Suppliers)
  //   supplier: Suppliers;
}

@ObjectType()
export class Category {
  @Field(() => ID)
  categoryId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class Suppliers {
  @Field(() => ID)
  supplierId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  companyName?: string;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => [Product])
  //   products: Product[];

  //   @Field(() => [HostelSuppliers])
  //   hostel: HostelSuppliers[];
}

@ObjectType()
export class HostelSuppliers {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Int)
  supplierId: number;

  @Field(() => Date)
  createdAt: Date;

  //   @Field(() => Hostel)
  //   hostel: Hostel;

  //   @Field(() => Suppliers)
  //   supplier: Suppliers;
}

@ObjectType()
export class Advertisement {
  @Field(() => ID)
  adId: number;

  @Field(() => Int, { nullable: true })
  adPlanId?: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float)
  budgetedAmount: number;

  @Field()
  paymentStatus: boolean;

  //   @Field(() => AdPlan, { nullable: true })
  //   adPlan?: AdPlan;
}

@ObjectType()
export class AdPlan {
  @Field(() => ID)
  adPlanId: number;

  @Field()
  name: string;

  @Field(() => Float)
  cost: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  features?: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => Advertisement, { nullable: true })
  //   advertisement?: Advertisement;

  //   @Field(() => [Payments])
  //   payments: Payments[];
}

@ObjectType()
export class Payments {
  @Field(() => ID)
  paymentId: number;

  @Field(() => Int)
  adPlanId: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Date)
  createdAt: Date;

  //   @Field(() => AdPlan)
  //   adPlan: AdPlan;

  //   @Field(() => Hostel)
  //   hostel: Hostel;
}

@ObjectType()
export class MonthlyPricing {
  @Field(() => ID)
  monthlyPricingId: number;

  @Field({ nullable: true })
  oneSeater?: number;

  @Field({ nullable: true })
  twoSeater?: number;

  @Field({ nullable: true })
  threeSeater?: number;

  @Field({ nullable: true })
  fourSeater?: number;

  @Field({ nullable: true })
  fiveSeater?: number;

  @Field({ nullable: true })
  attachBathroom?: number;
  @Field({ nullable: true })
  admission?: number;

  @Field({ nullable: true })
  deposite?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class DailyPricing {
  @Field(() => ID)
  dailyPricingId: number;

  @Field({ nullable: true })
  oneSeater?: number;

  @Field({ nullable: true })
  twoSeater?: number;

  @Field({ nullable: true })
  threeSeater?: number;

  @Field({ nullable: true })
  fourSeater?: number;

  @Field({ nullable: true })
  fiveSeater?: number;

  @Field({ nullable: true })
  attachBathroom?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class RoomAvailability {
  @Field(() => ID)
  roomAvailabilityId: number;

  @Field({ nullable: true })
  oneSeater?: boolean;

  @Field({ nullable: true })
  twoSeater?: boolean;

  @Field({ nullable: true })
  threeSeater?: boolean;

  @Field({ nullable: true })
  fourSeater?: boolean;

  @Field({ nullable: true })
  fiveSeater?: boolean;

  @Field({ nullable: true })
  attachBathroom?: boolean;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}

@ObjectType()
export class Gallery {
  @Field(() => ID)
  galleryId: number;

  @Field(() => Int)
  hostelId: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  caption?: string;

  @Field()
  url: string;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}

@ObjectType()
export class Socials {
  @Field(() => ID)
  socialsId: number;

  @Field({ nullable: true })
  instaGram?: string;

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  tiktok?: string;

  @Field({ nullable: true })
  map?: string;

  @Field({ nullable: true })
  youTube?: string;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}

@ObjectType()
export class Address {
  @Field(() => ID)
  addressId: number;

  @Field()
  country: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}

@ObjectType()
export class ContactDetails {
  @Field(() => ID)
  contactId: number;

  @Field()
  phone: string;

  @Field({ nullable: true })
  altPhone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => Date)
  updatedAt: Date;

  //   @Field(() => Hostel, { nullable: true })
  //   hostel?: Hostel;
}
@ObjectType()
export class NearbyPlace {
  @Field(() => Int)
  nearbyPlaceId: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class HostelSettings {
  @Field(() => Int)
  hostelSettingId: number;

  @Field({ nullable: true })
  currency?: string;

  @Field()
  fontSize: number;

  @Field()
  active: boolean;

  @Field()
  deActivate: boolean;

  @Field()
  visibility: VisibilityType;

  @Field()
  allowBooking: boolean;

  @Field()
  allowComments: boolean;

  @Field()
  allowPrivateFeedbacks: boolean;

  @Field()
  allowMessages: boolean;

  @Field()
  allowRating: boolean;

  @Field(() => [Badges])
  badges: Badges[];
}

@ObjectType()
export class SearchQuerys {
  @Field(() => ID)
  searchQueryId: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;
}

@ObjectType()
export class Amenities {
  @Field(() => Int)
  amenitiesId: number;

  @Field(() => Int)
  hostelId: number;

  @Field({ nullable: true })
  amenities?: string; // Will be stored as JSON string
}

@ObjectType()
export class Services {
  @Field(() => Int)
  servicesId: number;

  @Field(() => Int)
  hostelId: number;

  @Field()
  amenities: string; // JSON string
}

@ObjectType()
export class HostelRules {
  @Field(() => Int)
  rulesId: number;

  @Field(() => Int)
  hostelId: number;

  @Field()
  rules: string; // JSON string
}

@ObjectType()
export class SHostels {
  @Field(() => Int)
  sHostelsId: number;

  @Field()
  name: string;
  @Field()
  slug: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  genderType?: GenderType;

  @Field({ nullable: true })
  hostelType?: HostelType;

  @Field({ nullable: true })
  contact?: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  imgUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Hostel {
  @Field(() => ID)
  hostelId: number;

  @Field(() => ID)
  userId: number;

  @Field()
  name: string;

  @Field()
  verified: boolean;

  @Field()
  genderType: string; // Assuming GenderType is a string type

  @Field()
  hostelType: string; // Assuming GenderType is a string type

  @Field({ nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Define a field for owner (assuming it's a User type)
  @Field(() => Users)
  owner?: Users;

  // Define optional fields for relations to other models
  @Field(() => RoomAvailability, { nullable: true })
  roomAvailability?: RoomAvailability;

  @Field(() => DailyPricing, { nullable: true })
  dailyPricing?: DailyPricing;

  @Field(() => Socials, { nullable: true })
  socials?: Socials;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => ContactDetails, { nullable: true })
  contact?: ContactDetails;

  @Field(() => MonthlyPricing, { nullable: true })
  monthlyPricing?: MonthlyPricing;

  @Field(() => HostelSettings, { nullable: true })
  hostelSettings?: HostelSettings;

  @Field(() => [Orders], { nullable: true })
  orders?: Orders[];

  @Field(() => [NearbyPlace], { nullable: true })
  nearbyPlaces?: NearbyPlace[];

  @Field(() => [Payments], { nullable: true })
  payments?: Payments[];

  @Field(() => [Gallery], { nullable: true })
  gallery?: Gallery[];

  @Field(() => [HostelSuppliers], { nullable: true })
  suppliers?: HostelSuppliers[];
}

@ObjectType()
export class SearchQueries {
  @Field(() => Int)
  searchQueryId: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
