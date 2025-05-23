import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateGalleryInput } from './create-gallery.dto';

@InputType()
export class UpdateGalleryInput extends PartialType(CreateGalleryInput) {
  @Field()
  id: number;
}
