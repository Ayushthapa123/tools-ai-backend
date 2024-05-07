// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { GenderType, HostelType } from '@prisma/client';

@InputType()
export class SearchHostelInput {
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
  minRating?: number;

  @Field({ nullable: true }) //fot the price to check People must select the "Seater"
  maxPrice?: number;
}
