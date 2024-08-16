// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { GenderType, HostelType } from '@prisma/client';

@InputType()
export class SearchSHostelInput {
  @Field()
  genderType: GenderType;

  @Field()
  hostelType: HostelType;

  @Field()
  pageNumber: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  subCity?: string;
}
