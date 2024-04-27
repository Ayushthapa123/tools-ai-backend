// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomAvailibilityInput {
  @Field()
  hostelId: number;

  @Field({ nullable: true })
  oneSeater?: boolean;

  @Field({ nullable: true })
  twoSeater?: boolean;

  @Field({ nullable: true })
  threeSeater?: boolean;

  @Field({ nullable: true })
  fourSeater?: boolean;

  @Field({ nullable: true })
  fiveSeater?: boolean;

  @Field({ nullable: true })
  attachBathroom?: boolean;
}
