// src/hostel/dto/update-hostel.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateGalleryInput {
  @Field()
  galleryId: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  caption: string;

  @Field({ nullable: true })
  url: string;
}
