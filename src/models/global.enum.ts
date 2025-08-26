// user.enum.ts
// enums have been generated in schemas
import { registerEnumType } from '@nestjs/graphql';

// Enums from schema.prisma
export enum UserType {
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum GenderType {
  BOYS = 'BOYS',
  GIRLS = 'GIRLS',
  OTHERS = 'OTHERS',
}

export enum ToolType {
  IO = 'IO',
  CURD = 'CURD',
}

export enum ToolStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum VisibilityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum PricingType {
  FREE = 'FREE',
  FREEMIUM = 'FREEMIUM',
  PAID = 'PAID',
  CUSTOM = 'CUSTOM',
  TRIAL = 'TRIAL',
}

export enum AiType {
  GENERATIVE_AI = 'GENERATIVE_AI',
  CONVERSATIONAL_AI = 'CONVERSATIONAL_AI',
  COMPUTER_VISION = 'COMPUTER_VISION',
  SPEECH_AI = 'SPEECH_AI',
  RECOMMENDATION_AI = 'RECOMMENDATION_AI',
  AUTOMATION_AI = 'AUTOMATION_AI',
  ANALYTICS_AI = 'ANALYTICS_AI',
  SEARCH_RETRIEVAL_AI = 'SEARCH_RETRIEVAL_AI',
  CODE_AI = 'CODE_AI',
  MARKETING_AI = 'MARKETING_AI',
  SECURITY_AI = 'SECURITY_AI',
}

export enum PlatformType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}

// Register GraphQL enum types
registerEnumType(UserType, {
  name: 'UserType',
});

registerEnumType(PricingType, {
  name: 'PricingType',
});

registerEnumType(AiType, {
  name: 'AiType',
});

registerEnumType(PlatformType, {
  name: 'PlatformType',
});

registerEnumType(GenderType, {
  name: 'GenderType',
});

registerEnumType(ToolType, {
  name: 'ToolType',
});

registerEnumType(ToolStatus, {
  name: 'ToolStatus',
});

registerEnumType(VisibilityType, {
  name: 'VisibilityType',
});

// Legacy enums for backward compatibility
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

export enum HostelServiceType {
  FACEBOOK_MARKETING = 'FACEBOOK_MARKETING',
  GOOGLE_MARKETING = 'GOOGLE_MARKETING',
  EMPLOYEE = 'EMPLOYEE',
  REAL_ESTATE = 'REAL_ESTATE',
  FURNITURE = 'FURNITURE',
  OTHER = 'OTHER',
}

registerEnumType(HostelServiceType, {
  name: 'HostelServiceType',
});

export enum Priority {
  HIGH = 'HIGH',
  MID = 'MID',
  LOW = 'LOW',
}

registerEnumType(Priority, {
  name: 'Priority',
});

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(Status, {
  name: 'Status',
});
