import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGalleryInput {
  @Field()
  hostelId: number;

  @Field()
  url: string;

  @Field()
  caption: string;
}
