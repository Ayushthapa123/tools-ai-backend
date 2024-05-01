// src/hostel/dto/create-hostel.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { GenderType } from '@prisma/client';

@InputType()
export class CreateHostelInput {
  @Field()
  name: string;

  @Field()
  genderType: GenderType;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;
}
