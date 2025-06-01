import { InputType, Field } from '@nestjs/graphql';
import { HostelAmenityType } from '@prisma/client';

@InputType()
export class CreateAmenityOptionInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  iconUrl?: string;
  @Field({ nullable: true })
  hostelAmenityType: HostelAmenityType;
}
