// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field()
  hostelId: number;

  @Field()
  country: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  tole?: string;

  @Field({ nullable: true })
  street?: string;
}
