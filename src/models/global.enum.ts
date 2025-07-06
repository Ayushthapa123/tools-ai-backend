// user.enum.ts
// enums have been generated in schemas
import { registerEnumType } from '@nestjs/graphql';
import {
  RoomCapacity as RoomCapacityy,
  RoomStatus as RoomStatuss,
  UserType as UserTypee,
  BlogStatus as BlogStatuss,
  BlogTags as BlogTags,
} from '@prisma/client';

// If enum is not generated in frontend that's because you have not included the enum anywhere in the Model

export {
  RoomCapacityy as RoomCapacity,
  RoomStatuss as RoomStatus,
  UserTypee as UserType,
  BlogStatuss as BlogStatus,
  BlogTags as BlogTags,
};

registerEnumType(UserTypee, {
  name: 'UserType',
});

registerEnumType(RoomStatuss, {
  name: 'RoomStatus',
});

registerEnumType(BlogStatuss, {
  name: 'BlogStatus',
});

registerEnumType(BlogTags, {
  name: 'BlogTags',
});

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
});

export enum Currency {
  NPR = 'NPR',
  USD = 'USD',
}

registerEnumType(Currency, {
  name: 'Currency',
});

export enum WeekDays {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

registerEnumType(WeekDays, {
  name: 'WeekDays',
});

registerEnumType(RoomCapacityy, {
  name: 'RoomCapacity',
});

export enum Gender {
  BOYS = 'BOYS',
  GIRLS = 'GIRLS',
  OTHERS = 'OTHERS',
}

registerEnumType(Gender, {
  name: 'Gender',
});

export enum HostelGenderType {
  BOYS = 'BOYS',
  GIRLS = 'GIRLS',
  BOTH = 'BOTH',
}

registerEnumType(HostelGenderType, {
  name: 'HostelGenderType',
});

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  // AMOUNT = 'AMOUNT',
}

registerEnumType(DiscountType, {
  name: 'DiscountType',
});

export enum PaymentPlatformName {
  STRIPE = 'STRIPE',
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
}

registerEnumType(PaymentPlatformName, {
  name: 'PaymentPlatformName',
});

export enum HostelType {
  STAY = 'STAY',
  TRAVEL = 'TRAVEL',
  BOTH = 'BOTH',
  PG = 'PG',
}

registerEnumType(HostelType, {
  name: 'HostelType',
});

export enum VisibilityType {
  ALL = 'ALL',
  STUDENTS_ONLY = 'STUDENTS_ONLY',
  ONLY_ME = 'ONLY_ME',
}

registerEnumType(VisibilityType, {
  name: 'VisibilityType',
});

export enum GalleryType {
  PROFILE = 'PROFILE',
  COVER = 'COVER',
  ROOM = 'ROOM',
  BATHROOM = 'BATHROOM',
  BUILDING = 'BUILDING',
  KITCHEN = 'KITCHEN',
  CELEBRATIONS = 'CELEBRATIONS',
  REVIEW = 'REVIEW',
  FOOD = 'FOOD',
  OTHER = 'OTHER',
  LOGO = 'LOGO',
}

registerEnumType(GalleryType, {
  name: 'GalleryType',
});

// badges

// enum Badges {
//   NEW
//   PEOPLES_CHOICE
//   FAMOUS
//   GOOD_FOOD
//   GOOD_LOCATION
//   SOCIAL_BUTTERFLY
//   TECH_SAVVY
// }

export enum Badges {
  NEW = 'NEW',
  PEOPLE_CHOICE = 'PEOPLE_CHOICE',
  FAMOUS = 'FAMOUS',
  GOOD_FOOD = 'GOOD_FOOD',
  GOOD_LOCATION = 'GOOD_LOCATION',
  SOCIAL_BUTTERFLY = 'SOCIAL_BUTTERFLY',
  TECH_SAVVY = 'TECH_SAVVY',
}

registerEnumType(Badges, {
  name: 'Badges',
});

export enum HostelAmenityType {
  PROPERTY_ESSENTIALS = 'PROPERTY_ESSENTIALS',
  ROOM_ESSENTIALS = 'ROOM_ESSENTIALS',
  BATHROOM_ESSENTIALS = 'BATHROOM_ESSENTIALS',
  KITCHEN_ESSENTIALS = 'KITCHEN_ESSENTIALS',
  SAFETY_AND_HYGENE_ESSENTIALS = 'SAFETY_AND_HYGENE_ESSENTIALS',
  OTHER = 'OTHER',
}

registerEnumType(HostelAmenityType, {
  name: 'HostelAmenityType',
});
