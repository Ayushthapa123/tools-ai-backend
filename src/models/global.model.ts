// src/models/global.model.ts

import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  UserType,
  GenderType,
  ToolType,
  VisibilityType,
  PricingType,
  AiType,
  PlatformType,
  AiCapability,
  Modality,
  Delivery,
  IntegrationOption,
  ToolUserType,
  Domain,
  ListedBy,
  ProductType,
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

@ObjectType()
export class Pagination {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Int)
  totalPages: number;
}

// Base response type for all models
@ObjectType()
export class BaseResponse {
  @Field(() => GraphQLError, { nullable: true })
  error?: GraphQLError;

  @Field(() => Pagination, { nullable: true })
  pagination?: Pagination;
}

// User related types
@ObjectType()
export class UserData {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field()
  fullName: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  altPhoneNumber?: string;

  @Field({ nullable: true })
  hashedRefreshToken?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => UserType)
  userType: UserType;

  @Field()
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [ToolData], { nullable: true })
  tools?: ToolData[];
}

@ObjectType()
export class User extends BaseResponse {
  @Field(() => UserData, { nullable: true })
  data?: UserData;
}

@ObjectType()
export class UserList extends BaseResponse {
  @Field(() => [UserData], { nullable: true })
  data?: UserData[];
}

// InputSchema related types
@ObjectType()
export class InputSchemaData {
  @Field(() => ID)
  id: number;

  @Field(() => GraphQLJSON)
  schema: any;

  @Field(() => Int)
  toolId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class InputSchema extends BaseResponse {
  @Field(() => InputSchemaData, { nullable: true })
  data?: InputSchemaData;
}

// OutputSchema related types
@ObjectType()
export class OutputSchemaData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  schema: string;

  @Field(() => Int)
  toolId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class OutputSchema extends BaseResponse {
  @Field(() => OutputSchemaData, { nullable: true })
  data?: OutputSchemaData;
}

// ToolMetadata related types
@ObjectType()
export class ToolMetadataData {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  ogTitle?: string;

  @Field({ nullable: true })
  ogDescription?: string;

  @Field({ nullable: true })
  ogImageUrl?: string;

  @Field(() => Int)
  toolId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

// Tool related types
@ObjectType()
export class ToolData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  shortDescription?: string;

  @Field()
  slug: string;

  @Field()
  handle: string;

  @Field({ nullable: true })
  thumbnailUrl?: string;

  @Field(() => Int, { nullable: true })
  ranking?: number;

  @Field(() => ToolType)
  toolType: ToolType;

  @Field(() => VisibilityType)
  visibility: VisibilityType;

  @Field(() => Int)
  ownerId: number;

  @Field()
  verifiedBySuperAdmin: boolean;

  @Field(() => UserData, { nullable: true })
  owner?: UserData;

  @Field(() => InputSchemaData, { nullable: true })
  inputSchema?: InputSchemaData;

  @Field(() => OutputSchemaData, { nullable: true })
  outputSchema?: OutputSchemaData;

  @Field(() => ToolMetadataData, { nullable: true })
  toolMetadata?: ToolMetadataData;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

@ObjectType()
export class Tool extends BaseResponse {
  @Field(() => ToolData, { nullable: true })
  data?: ToolData;
}

@ObjectType()
export class ToolList extends BaseResponse {
  @Field(() => [ToolData], { nullable: true })
  data?: ToolData[];
}

@ObjectType()
export class ListedAiToolData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  shortDescription: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field({ nullable: true })
  websiteUrl?: string; 

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => [ToolUserType])
  toolUserTypes: ToolUserType[];

  @Field(() => [String])
  keywords: string[];

  @Field(() => ListedBy)
  listedBy: ListedBy;

  @Field(() => [PricingType])
  pricingType: PricingType[];

  @Field(() => [AiType])
  aiType: AiType[];

  @Field(() => [ProductType])
  productType: ProductType[];

  @Field(() => [AiCapability])
  aiCapabilities: AiCapability[];

  @Field(() => [Modality])
  modalities: Modality[];

  @Field(() => [Delivery])
  delivery: Delivery[];

  @Field(() => [Domain])
  domains: Domain[];

  @Field(() => [PlatformType])
  platforms: PlatformType[];

  @Field(() => [IntegrationOption])
  integrationOptions: IntegrationOption[];

  @Field(() => Int)
  popularityScore: number;

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => [String])
  useCases: string[];

  @Field(() => [String])
  usps: string[];

  @Field(() => [String])
  features: string[];

  @Field(() => Date, { nullable: true })
  publishedAt?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class ListedAiTool extends BaseResponse {
  @Field(() => ListedAiToolData, { nullable: true })
  data?: ListedAiToolData;
}

@ObjectType()
export class ListedAiToolList extends BaseResponse {
  @Field(() => [ListedAiToolData], { nullable: true })
  data?: ListedAiToolData[];
}

@ObjectType()
export class ToolMetadata extends BaseResponse {
  @Field(() => ToolMetadataData, { nullable: true })
  data?: ToolMetadataData;
}

// Context type for authentication
@ObjectType()
export class Ctx {
  @Field()
  sub: number;

  @Field(() => UserType)
  userType: UserType;
}

@ObjectType()
export class CtxType {
  @Field(() => Ctx)
  user: Ctx;
}
