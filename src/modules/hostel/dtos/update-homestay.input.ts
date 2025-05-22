import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHomestayInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  moderatedByCommunityOwner?: boolean;

  @Field({ nullable: true })
  moderatedBySuperAdmin?: boolean;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int, { nullable: true })
  ownerId?: number;
}
