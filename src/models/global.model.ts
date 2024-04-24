// src/models/hostel.model.ts

import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Hostel {
  @Field(() => ID)
  hostelId: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => Int)
  verified: boolean;

  @Field()
  genderType: string;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => Int, { nullable: true })
  roomAvailabilityId?: number;

  @Field(() => Int, { nullable: true })
  pricingId?: number;

  @Field(() => Int, { nullable: true })
  socialsId?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  //   @Field(() => Users)
  //   owner: Users;

  //   @Field(() => RoomAvailability, { nullable: true })
  //   roomAvailability?: RoomAvailability;

  //   @Field(() => Pricing, { nullable: true })
  //   pricing?: Pricing;

  //   @Field(() => Socials, { nullable: true })
  //   socials?: Socials;

  //   @Field(() => Address)
  //   address: Address;

  //   @Field(() => ContactDetails)
  //   contact: ContactDetails;

  //   @Field(() => [Orders])
  //   orders: Orders[];

  //   @Field(() => [Payments])
  //   payments: Payments[];

  //   @Field(() => [Gallery])
  //   gallery: Gallery[];

  //   @Field(() => [HostelSuppliers])
  //   suppliers: HostelSuppliers[];
}

@ObjectType()
export class Users {
  @Field(() => ID)
  userId: number;

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
export class HostelFeatures {
  @Field(() => ID)
  hostelFeatureId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  emojiUrl?: string;
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
  pricingId: number;

  @Field({ nullable: true })
  oneSeater?: string;

  @Field({ nullable: true })
  twoSeater?: string;

  @Field({ nullable: true })
  threeSeater?: string;

  @Field({ nullable: true })
  fourSeater?: string;

  @Field({ nullable: true })
  fiveSeater?: string;

  @Field({ nullable: true })
  attachBathroom?: string;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class DailyPricing {
  @Field(() => ID)
  pricingId: number;

  @Field({ nullable: true })
  oneSeater?: string;

  @Field({ nullable: true })
  twoSeater?: string;

  @Field({ nullable: true })
  threeSeater?: string;

  @Field({ nullable: true })
  fourSeater?: string;

  @Field({ nullable: true })
  fiveSeater?: string;

  @Field({ nullable: true })
  attachBathroom?: string;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class RoomAvailability {
  @Field(() => ID)
  roomAvailabilityId: number;

  @Field({ nullable: true })
  oneSeater?: string;

  @Field({ nullable: true })
  twoSeater?: string;

  @Field({ nullable: true })
  threeSeater?: string;

  @Field({ nullable: true })
  fourSeater?: string;

  @Field({ nullable: true })
  fiveSeater?: string;

  @Field({ nullable: true })
  attachBathroom?: string;

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
  district?: string;

  @Field({ nullable: true })
  city?: string;

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
