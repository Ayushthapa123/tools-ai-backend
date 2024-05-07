// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  hostelId: number;
  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  altPhone?: string;
}
