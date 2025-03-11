import { InputType, Field } from '@nestjs/graphql';
import { GenderType, HostelType } from '@prisma/client';

@InputType()
export class CreateSHostelsInput {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  hostelType?: HostelType;
  @Field({ nullable: true })
  genderType?: GenderType;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  ranking?: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  imgUrl?: string;
  @Field({ nullable: true })
  originalUrl?: string;
}
