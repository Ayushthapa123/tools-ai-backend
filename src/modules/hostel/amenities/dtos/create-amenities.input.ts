import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAmenitiesInput {
  @Field(() => Int)
  hostelId: number;

  @Field()
  amenities: string; // JSON string
}