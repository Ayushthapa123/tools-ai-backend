// src/models/hostel.model.ts

import {} from // UserType,
// HostelType,
// VisibilityType,
// GalleryType,
// WeekDays,
// RoomStatus,
// RoomCapacity,
// Currency,
'@prisma/client';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import {
  UserType,
  HostelType,
  VisibilityType,
  GalleryType,
  WeekDays,
  Gender,
  RoomCapacity,
  Currency,
  HostelGenderType,
  RoomStatus,
  BookingStatus,
  PaymentPlatformName,
  DiscountType,
  Badges,
  HostelAmenityType,
} from './global.enum';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class GraphQLError {
  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  path?: string;
}

// Base response type for all models
@ObjectType()
export class BaseResponse {
  @Field(() => GraphQLError, { nullable: true })
  error?: GraphQLError;
}

// User related types
@ObjectType()
export class UserData {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  hostelId?: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  altPhoneNumber?: string;

  @Field({ nullable: true })
  hashedRefreshToken?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => UserType)
  userType: UserType;

  @Field()
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  // @Field(() => Hostel, { nullable: true })
  // hostel?: Hostel;

  // @Field(() => [Booking], { nullable: true })
  // booking?: Booking[];
}

@ObjectType()
export class User extends BaseResponse {
  @Field(() => UserData, { nullable: true })
  data?: UserData;
}

@ObjectType()
export class RoomImageData {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  caption?: string;

  @Field()
  url: string;

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // @Field(() => RoomData)
  // room: RoomData;
}

@ObjectType()
export class RoomImage extends BaseResponse {
  @Field(() => RoomImageData, { nullable: true })
  data?: RoomImageData;
}

@ObjectType()
export class RoomImageList extends BaseResponse {
  @Field(() => [RoomImageData], { nullable: true })
  data?: RoomImageData[];
}

// Price related types
@ObjectType()
export class PriceData {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  baseAmountPerDay?: number;

  @Field(() => Int)
  baseAmountPerMonth: number;

  @Field(() => Currency)
  currency: Currency;

  @Field()
  isDynamicPricing: boolean;

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  discountAmount?: number;

  @Field(() => DiscountType, { nullable: true })
  discountType?: DiscountType;

  @Field()
  isDiscountActive: boolean;
}

@ObjectType()
export class Price extends BaseResponse {
  @Field(() => PriceData, { nullable: true })
  data?: PriceData;
}

// DynamicPricingRule related types
@ObjectType()
export class DynamicPricingRuleData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Int)
  amount: number;

  @Field()
  isWeekend: boolean;

  @Field()
  isActive: boolean;

  @Field(() => Int)
  priority: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class DynamicPricingRule extends BaseResponse {
  @Field(() => DynamicPricingRuleData, { nullable: true })
  data?: DynamicPricingRuleData;
}

@ObjectType()
export class DynamicPricingRuleList extends BaseResponse {
  @Field(() => [DynamicPricingRuleData], { nullable: true })
  data?: DynamicPricingRuleData[];
}

// RoomAmenity related types
@ObjectType()
export class RoomAmenityData {
  @Field(() => ID)
  id: number;

  @Field(() => GraphQLJSON)
  amenity: any; // JSON type

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class RoomAmenity extends BaseResponse {
  @Field(() => RoomAmenityData, { nullable: true })
  data?: RoomAmenityData;
}

// Room related types
@ObjectType()
export class RoomData {
  @Field(() => ID)
  id: number;

  @Field(() => RoomStatus)
  status: RoomStatus;

  @Field(() => RoomCapacity)
  capacity: RoomCapacity;

  @Field({ nullable: true })
  attachBathroom?: boolean;

  @Field(() => Int)
  hostelId: number;

  @Field()
  caption: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  roomNumber?: string;

  @Field({ nullable: true })
  maxOccupancy?: string;

  // @Field(() => [BookingData], { nullable: true })
  // booking?: BookingData[];

  @Field(() => PriceData, { nullable: true })
  price?: PriceData;

  @Field(() => [DynamicPricingRuleData], { nullable: true })
  dynamicPricingRule?: DynamicPricingRuleData[];

  @Field(() => Int, { nullable: true })
  roomAmenityId?: number;

  @Field(() => RoomAmenityData, { nullable: true })
  roomAmenity?: RoomAmenityData;

  @Field(() => [RoomImageData])
  image: RoomImageData[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Room extends BaseResponse {
  @Field(() => RoomData, { nullable: true })
  data?: RoomData;
}

@ObjectType()
export class RoomList extends BaseResponse {
  @Field(() => [RoomData], { nullable: true })
  data?: RoomData[];
}

// Booking related types
@ObjectType()
export class BookingData {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  roomId: number;

  @Field(() => Int)
  guestId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => BookingStatus)
  status: BookingStatus;

  @Field(() => PaymentPlatformName)
  paymentPlatformName: PaymentPlatformName;

  @Field()
  bookingKey: string;

  @Field(() => UserData)
  guest: UserData;

  @Field(() => RoomData)
  room: RoomData;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Booking extends BaseResponse {
  @Field(() => BookingData, { nullable: true })
  data?: BookingData;
}

@ObjectType()
export class BookingList extends BaseResponse {
  @Field(() => [BookingData], { nullable: true })
  data?: BookingData[];
}

// RoomImage related types

// Gallery related types
@ObjectType()
export class GalleryData {
  @Field(() => ID)
  id: number;
  @Field(() => Int)
  hostelId: number;

  @Field(() => GalleryType)
  type: GalleryType;

  @Field({ nullable: true })
  caption?: string;

  @Field({ nullable: true })
  isSelected?: boolean;

  @Field()
  url: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Gallery extends BaseResponse {
  @Field(() => GalleryData, { nullable: true })
  data?: GalleryData;
}

@ObjectType()
export class GalleryList extends BaseResponse {
  @Field(() => [GalleryData], { nullable: true })
  data?: GalleryData[];
}

// Social related types
@ObjectType()
export class SocialData {
  @Field(() => ID)
  id: number;

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

  @Field(() => Int)
  hostelId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Social extends BaseResponse {
  @Field(() => SocialData, { nullable: true })
  data?: SocialData;
}

// Address related types
@ObjectType()
export class AddressData {
  @Field(() => ID)
  id: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Address extends BaseResponse {
  @Field(() => AddressData, { nullable: true })
  data?: AddressData;
}

// SearchQuery related types
@ObjectType()
export class SearchQueryData {
  @Field(() => ID)
  id: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class SearchQuery extends BaseResponse {
  @Field(() => [SearchQueryData], { nullable: true })
  data?: SearchQueryData[];
}

// ContactDetail related types
@ObjectType()
export class ContactDetailData {
  @Field(() => ID)
  id: number;

  @Field()
  phone: string;

  @Field({ nullable: true })
  altPhone?: string;

  @Field()
  email: string;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class ContactDetail extends BaseResponse {
  @Field(() => ContactDetailData, { nullable: true })
  data?: ContactDetailData;
}

// HostelSetting related types
@ObjectType()
export class HostelSettingData {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  currency?: string;

  @Field(() => Int)
  fontSize: number;

  @Field()
  active: boolean;

  @Field()
  deActivate: boolean;

  @Field(() => VisibilityType)
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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  hostelId: number;
}

@ObjectType()
export class HostelSetting extends BaseResponse {
  @Field(() => HostelSettingData, { nullable: true })
  data?: HostelSettingData;
}

// NearbyPlace related types
@ObjectType()
export class NearbyPlaceData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  hostelId: number;
}

@ObjectType()
export class NearbyPlace extends BaseResponse {
  @Field(() => NearbyPlaceData, { nullable: true })
  data?: NearbyPlaceData;
}

// Amenities related types
@ObjectType()
export class AmenitiesData {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => GraphQLJSON)
  amenities: any; // JSON type
}

@ObjectType()
export class Amenities extends BaseResponse {
  @Field(() => AmenitiesData, { nullable: true })
  data?: AmenitiesData;
}

// Service related types
@ObjectType()
export class ServiceData {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => GraphQLJSON)
  services: any; // JSON type
}

@ObjectType()
export class Service extends BaseResponse {
  @Field(() => ServiceData, { nullable: true })
  data?: ServiceData;
}

// HostelRules related types
@ObjectType()
export class HostelRulesData {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  hostelId: number;

  @Field(() => GraphQLJSON)
  rules: any; // JSON type
}

@ObjectType()
export class HostelRules extends BaseResponse {
  @Field(() => HostelRulesData, { nullable: true })
  data?: HostelRulesData;
}

// FoodMenu related types
@ObjectType()
export class FoodMenuData {
  @Field(() => ID)
  id: number;

  @Field(() => WeekDays)
  day: WeekDays;

  @Field({ nullable: true })
  lunch?: string;

  @Field({ nullable: true })
  dinner?: string;

  @Field({ nullable: true })
  snacks?: string;

  @Field({ nullable: true })
  lunchTime?: string;

  @Field({ nullable: true })
  snacksTime?: string;

  @Field({ nullable: true })
  dinnerTime?: string;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class FoodMenu extends BaseResponse {
  @Field(() => FoodMenuData, { nullable: true })
  data?: FoodMenuData;
}

// Hostel related types
@ObjectType()
export class HostelData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field(() => Int, { nullable: true })
  ranking?: number;

  @Field(() => HostelGenderType)
  genderType: HostelGenderType;

  @Field(() => HostelType)
  hostelType: HostelType;

  @Field(() => Int)
  ownerId: number;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field()
  verifiedBySuperAdmin: boolean;

  @Field()
  verifiedByCommunityOwner: boolean;

  @Field(() => UserData, { nullable: true })
  owner?: UserData;

  @Field(() => SocialData, { nullable: true })
  social?: SocialData;

  @Field(() => AddressData, { nullable: true })
  address?: AddressData;

  @Field(() => ContactDetailData, { nullable: true })
  contact?: ContactDetailData;

  @Field(() => HostelSettingData, { nullable: true })
  hostelSettings?: HostelSettingData;

  @Field(() => AmenitiesData, { nullable: true })
  amenities?: AmenitiesData;

  @Field(() => ServiceData, { nullable: true })
  service?: ServiceData;

  @Field(() => HostelRulesData, { nullable: true })
  hostelRules?: HostelRulesData;

  @Field(() => [GalleryData])
  gallery: GalleryData[];

  @Field(() => [RoomData])
  rooms: Room[];

  @Field(() => [NearbyPlaceData])
  nearbyPlaces: NearbyPlaceData[];

  @Field(() => [FoodMenuData])
  foodMenu: FoodMenuData[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

@ObjectType()
export class Hostel extends BaseResponse {
  @Field(() => HostelData, { nullable: true })
  data?: HostelData;
}

@ObjectType()
export class AmenityOptionData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  iconUrl?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => HostelAmenityType)
  hostelAmenityType: HostelAmenityType;
}

@ObjectType()
export class AmenityOption extends BaseResponse {
  @Field(() => AmenityOptionData, { nullable: true })
  data?: AmenityOptionData;
}

@ObjectType()
export class AmenityOptionList extends BaseResponse {
  @Field(() => [AmenityOptionData], { nullable: true })
  data?: AmenityOptionData[];
}

@ObjectType()
export class ServiceOptionData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  iconUrl?: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class ServiceOption extends BaseResponse {
  @Field(() => ServiceOptionData, { nullable: true })
  data?: ServiceOptionData;
}

@ObjectType()
export class ServiceOptionList extends BaseResponse {
  @Field(() => [ServiceOptionData], { nullable: true })
  data?: ServiceOptionData[];
}

@ObjectType()
export class RoomAmenityOptionData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  iconUrl?: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class RoomAmenityOption extends BaseResponse {
  @Field(() => RoomAmenityOptionData, { nullable: true })
  data?: RoomAmenityOptionData;
}

@ObjectType()
export class RoomAmenityOptionList extends BaseResponse {
  @Field(() => [RoomAmenityOptionData], { nullable: true })
  data?: RoomAmenityOptionData[];
}

@ObjectType()
export class Ctx {
  @Field()
  sub: number;

  @Field(() => UserType)
  userType: UserType;

  @Field({ nullable: true })
  hostelId?: number;
}

@ObjectType()
export class CtxType {
  @Field(() => Ctx)
  user: Ctx;
}

@ObjectType()
export class BookingConfirmationMailData {
  @Field(() => [Int])
  roomNumbers: string[];

  @Field()
  name: string;
}
