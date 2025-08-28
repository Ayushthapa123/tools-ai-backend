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
export class CreateListedAiToolInput {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  logoUrl: string;

  @Field()
  websiteUrl: string;

  @Field(() => [PricingType])
  pricingType: PricingType[];

  @Field(() => [AiType])
  aiType: AiType[];

  @Field(() => [AiCapability])
  aiCapabilities: AiCapability[];

  @Field(() => [Modality])
  modalities: Modality[];

  @Field(() => [Delivery])
  delivery: Delivery[];

  @Field(() => [PlatformType])
  platforms: PlatformType[];

  @Field(() => [IntegrationOption])
  integrationOptions: IntegrationOption[];

  @Field(() => [Domain])
  domains: Domain[];

  @Field(() => [ToolUserType])
  toolUserTypes: ToolUserType[];

  @Field(() => [String])
  keywords: string[];

  @Field(() => Int)
  popularityScore: number;

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => [String])
  useCases: string[];
}
