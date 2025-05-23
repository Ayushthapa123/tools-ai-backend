import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateRoomAmenityInput } from './create-amenity.dto';

@InputType()
export class UpdateRoomAmenityInput extends PartialType(
  CreateRoomAmenityInput,
) {
  @Field(() => Int)
  id: number;
}
