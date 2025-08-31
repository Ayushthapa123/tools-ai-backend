import { InputType, Field, Int } from '@nestjs/graphql';
import {
  AiCapability,
  AiType,
  Delivery,
  Domain,
  IntegrationOption,
  Modality,
  PlatformType,
  PricingType,
  ToolUserType,
} from '@src/models/global.enum';

@InputType()
export class SearchListedAiToolInput {
  @Field(() => Int, { defaultValue: 1 })
  pageNumber: number;

  @Field(() => Int, { defaultValue: 20 })
  pageSize: number;

  @Field({ nullable: true })
  searchTerm?: string;

  @Field(() => [ToolUserType], { nullable: true })
  toolUserTypes?: ToolUserType[];

  @Field(() => [PricingType], { nullable: true })
  pricingTypes?: PricingType[];

  @Field(() => [AiType], { nullable: true })
  aiTypes?: AiType[];

  @Field(() => [AiCapability], { nullable: true })
  aiCapabilities?: AiCapability[];

  @Field(() => [Modality], { nullable: true })
  modalities?: Modality[];

  @Field(() => [Delivery], { nullable: true })
  delivery?: Delivery[];

  @Field(() => [Domain], { nullable: true })
  domains?: Domain[];

  @Field(() => [PlatformType], { nullable: true })
  platforms?: PlatformType[];

  @Field(() => [IntegrationOption], { nullable: true })
  integrationOptions?: IntegrationOption[];

  @Field(() => [String], { nullable: true })
  keywords?: string[];

  @Field(() => Int, { nullable: true })
  minPopularityScore?: number;

  @Field(() => Int, { nullable: true })
  maxPopularityScore?: number;

  @Field(() => Boolean, { nullable: true })
  featured?: boolean;

  @Field(() => Boolean, { nullable: true })
  verified?: boolean;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  sortOrder?: 'asc' | 'desc';
}
