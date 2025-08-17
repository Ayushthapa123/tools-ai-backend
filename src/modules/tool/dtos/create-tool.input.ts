import { InputType, Field, Int } from '@nestjs/graphql';
import { ToolType, VisibilityType } from '@prisma/client';

@InputType()
export class CreateToolInput {
  @Field()
  name: string;

  @Field()
  description: string;

  // handle should be unique
  @Field()
  handle: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field()
  shortDescription: string;

  @Field()
  thumbnailUrl: string;

  @Field()
  visibility: VisibilityType;

  @Field()
  toolType: ToolType;

  @Field(() => Int)
  ranking: number;

  @Field(() => Int)
  ownerId: number;

  @Field(() => Boolean)
  verifiedBySuperAdmin: boolean;
}
