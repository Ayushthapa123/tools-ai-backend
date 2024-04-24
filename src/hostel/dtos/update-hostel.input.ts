// src/hostel/dto/update-hostel.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHostelInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  verified?: boolean;

  @Field({ nullable: true })
  genderType?: string;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int, { nullable: true })
  addressId?: number;

  @Field(() => Int, { nullable: true })
  contactId?: number;

  @Field(() => Int, { nullable: true })
  roomAvailabilityId?: number;

  @Field(() => Int, { nullable: true })
  pricingId?: number;

  @Field(() => Int, { nullable: true })
  socialsId?: number;
}
