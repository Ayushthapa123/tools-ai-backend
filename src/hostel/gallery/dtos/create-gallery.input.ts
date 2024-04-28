// src/hostel/dto/create-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGalleryInput {
  @Field()
  hostelId: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  caption: string;

  @Field()
  url: string;
}
