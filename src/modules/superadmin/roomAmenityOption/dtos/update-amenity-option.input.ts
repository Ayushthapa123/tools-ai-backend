import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRoomAmenityOptionInput } from './create-amenity-option.input';

@InputType()
export class UpdateRoomAmenityOptionInput extends PartialType(
  CreateRoomAmenityOptionInput,
) {}
