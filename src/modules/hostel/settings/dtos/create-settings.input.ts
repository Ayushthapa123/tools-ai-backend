// src/hostel/dto/create-hostel-settings.input.ts

import { Badges } from '@src/dtos/global.dtos';
import { VisibilityType } from '@prisma/client';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHostelSettingsInput {
  // @Field()
  // hostelId: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ defaultValue: 14 })
  fontSize: number;

  @Field({ defaultValue: true })
  active: boolean;

  @Field({ defaultValue: false })
  deActivate: boolean;

  @Field({ defaultValue: VisibilityType.ALL })
  visibility: VisibilityType;

  @Field({ defaultValue: false })
  allowBooking: boolean;

  @Field({ defaultValue: false })
  allowComments: boolean;

  @Field({ defaultValue: false })
  allowPrivateFeedbacks: boolean;

  @Field({ defaultValue: false })
  allowMessages: boolean;

  @Field({ defaultValue: false })
  allowRating: boolean;

  @Field(() => [Badges], { defaultValue: [] })
  badges: Badges[];
}
