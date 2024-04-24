// src/hostel/dto/create-hostel.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHostelInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  verified: boolean;

  @Field()
  genderType: string;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => Int, { nullable: true })
  roomAvailabilityId?: number;

  @Field(() => Int, { nullable: true })
  pricingId?: number;

  @Field(() => Int, { nullable: true })
  socialsId?: number;
}
