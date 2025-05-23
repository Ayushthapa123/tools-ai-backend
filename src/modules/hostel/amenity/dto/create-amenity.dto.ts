import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAmenityInput {
  @Field()
  amenity: string;

  @Field(() => Int)
  hostelId: number;
}
