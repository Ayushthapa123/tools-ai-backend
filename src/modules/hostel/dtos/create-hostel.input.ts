import { InputType, Field } from '@nestjs/graphql';
import { HostelGenderType, HostelType } from '@prisma/client';

@InputType()
export class CreateHostelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  hostelType?: HostelType;

  @Field({ nullable: true })
  genderType?: HostelGenderType;
}
