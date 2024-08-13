// src/hostel/dto/update-hostel-settings.input.ts

import { CreateHostelSettingsInput } from './create-settings.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHostelSettingsInput extends PartialType(
  CreateHostelSettingsInput,
) {
  @Field(() => Int)
  hostelSettingId: number;
}
