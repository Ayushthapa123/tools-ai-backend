import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateServicesInput {
  @Field(() => Int)
  hostelId: number;

  @Field()
  amenities: string; // JSON string
}