// src/hostel/dto/update-hostel.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { GenderType, HostelType } from '@prisma/client';

@InputType()
export class UpdateHostelInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  verified?: boolean;

  @Field({ nullable: true })
  genderType?: GenderType;

  @Field({ nullable: true })
  hostelType?: HostelType;

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
}
