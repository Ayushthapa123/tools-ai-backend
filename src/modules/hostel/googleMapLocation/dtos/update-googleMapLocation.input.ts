// src/hostel/dto/update-hostel-settings.input.ts

import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateGoogleMapLocationInput } from './create-googleMapLocation.input';

@InputType()
export class UpdateGoogleMapLocation extends PartialType(
  CreateGoogleMapLocationInput,
) {
  @Field(() => Int)
  googleMapLocationId: number;
}
