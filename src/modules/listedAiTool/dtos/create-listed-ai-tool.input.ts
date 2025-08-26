import { InputType, Field, Int } from '@nestjs/graphql';
import { AiType, PlatformType, PricingType } from '@src/models/global.enum';

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

  @Field(() => PricingType)
  pricingType: PricingType;

  @Field(() => AiType)
  aiType: AiType;

  @Field(() => [String])
  userTypes: string[];

  @Field(() => [String])
  keywords: string[];

  @Field(() => [PlatformType])
  platforms: PlatformType[];

  @Field(() => [String])
  integrationOptions: string[];

  @Field(() => Int)
  popularityScore: number;

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => [String])
  useCases: string[];
}
