// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNearbyPlaceInput {
  // @Field()
  // nearbyPlaceId: number;

  @Field()
  hostelId: number;

  @Field()
  name: string;

  @Field()
  description: string;
}
