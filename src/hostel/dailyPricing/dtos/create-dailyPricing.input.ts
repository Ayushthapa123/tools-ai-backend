// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDailyPricingInput {
  @Field()
  hostelId: number;

  @Field({ nullable: true })
  oneSeater: number;
  @Field({ nullable: true })
  twoSeater: number;
  @Field({ nullable: true })
  threeSeater: number;
  @Field({ nullable: true })
  fourSeater: number;
  @Field({ nullable: true })
  fiveSeater: number;
  @Field({ nullable: true })
  attachBathroom: number;
}
