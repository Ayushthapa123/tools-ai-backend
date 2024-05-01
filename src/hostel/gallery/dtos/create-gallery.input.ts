import { InputType, Field } from '@nestjs/graphql';
import { GalleryType } from '@prisma/client';

@InputType()
export class CreateGalleryInput {
  @Field()
  hostelId: number;

  @Field({ nullable: true })
  type: GalleryType;

  @Field({ nullable: true })
  caption: string;

  @Field()
  url: string;
}
