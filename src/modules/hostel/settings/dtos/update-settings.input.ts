// src/hostel/dto/update-hostel-settings.input.ts

import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateHostelSettingsInput } from './create-settings.input';

@InputType()
export class UpdateHostelSettingsInput extends PartialType(CreateHostelSettingsInput) {
  @Field(() => ID)
  hostelSettingId: number;
}
