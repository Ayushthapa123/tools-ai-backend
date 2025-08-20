import { InputType, Field, Int } from '@nestjs/graphql';
import { ToolType, VisibilityType } from '@prisma/client';

@InputType()
export class CreateToolInput {
  @Field()
  name: string;

  @Field()
  description: string;

  // handle should be unique
  @Field({ nullable: true })
  handle?: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field()
  shortDescription: string;

  @Field({ nullable: true })
  thumbnailUrl?: string;

  @Field({ nullable: true, defaultValue: VisibilityType.PUBLIC }) // set default to public
  visibility: VisibilityType;

  @Field({ nullable: true, defaultValue: ToolType.IO }) // set default to generic
  toolType: ToolType;

  @Field(() => Int, { nullable: true, defaultValue: 0 }) // set default to 0
  ranking: number;

  @Field(() => Int, { nullable: true })
  ownerId: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false }) // set default to false
  verifiedBySuperAdmin: boolean;
}
