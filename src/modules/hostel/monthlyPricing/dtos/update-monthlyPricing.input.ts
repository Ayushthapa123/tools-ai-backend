// src/hostel/dto/update-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateMonthlyPricingInput {
  @Field({ nullable: true })
  instaGram: string;

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

  @Field({ nullable: true })
  admission: number;
  @Field({ nullable: true })
  deposite: number;
}
