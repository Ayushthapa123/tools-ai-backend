import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => Int, { nullable: true })
  hostelId?: number;

  @Field(() => Int, { nullable: true })
  hostelSearchFormId?: number;

  @Field()
  country: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;
}
