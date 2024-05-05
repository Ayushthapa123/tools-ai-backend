// src/hostel/dto/update-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { GalleryType } from '@prisma/client';

@InputType()
export class UpdateGalleryInput {
  @Field({ nullable: true })
  type: GalleryType;

  @Field({ nullable: true })
  caption: string;

  @Field({ nullable: true })
  url: string;
}
