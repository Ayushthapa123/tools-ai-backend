import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenericAddressInput {
  @Field()
  country: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;
}
