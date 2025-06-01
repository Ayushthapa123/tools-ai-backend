import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAmenityOptionInput } from './create-amenity-option.input';

@InputType()
export class UpdateAmenityOptionInput extends PartialType(
  CreateAmenityOptionInput,
) {}
