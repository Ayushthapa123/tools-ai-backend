import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAmenityInput } from './create-amenity.dto';

@InputType()
export class UpdateAmenityInput extends PartialType(CreateAmenityInput) {
  @Field(() => Int)
  id: number;
}
