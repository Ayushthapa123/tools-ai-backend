// user.enum.ts
// enums have been generated in schemas
import { registerEnumType } from '@nestjs/graphql';
import {
  RoomCapacity as RoomCapacityy,
  RoomStatus as RoomStatuss,
  UserType as UserTypee,
} from '@prisma/client';

export {
  RoomCapacityy as RoomCapacity,
  RoomStatuss as RoomStatus,
  UserTypee as UserType,
};

registerEnumType(UserTypee, {
  name: 'UserType',
});

registerEnumType(RoomStatuss, {
  name: 'RoomStatus',
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
