// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSocialsInput {
  @Field()
  hostelId: number;

  @Field({ nullable: true })
  instaGram: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  tiktok?: string;
  @Field({ nullable: true })
  map?: string;

  @Field({ nullable: true })
  youtube?: string;
}
