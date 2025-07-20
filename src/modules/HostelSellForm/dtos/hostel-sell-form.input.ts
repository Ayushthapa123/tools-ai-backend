import { InputType, Field, Int } from '@nestjs/graphql';
import { HostelGenderType, HostelType } from '@prisma/client';
import { CreateGenericAddressInput } from '@src/modules/genericAddress/dtos/create-address.input';

@InputType()
export class CreateHostelSellFormInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String)
  hostelName: string;

  @Field(() => String)
  hostelDescription: string;

  @Field()
  hostelType: HostelType;

  @Field()
  hostelGenderType: HostelGenderType;

  @Field(() => Int)
  hostelCapacity: number;

  @Field(() => String, { nullable: true })
  hostelImageUrl?: string;

  @Field(() => Int)
  sellingPrice: number;

  // @Field(() => Int)
  // addressId: number;

  @Field(() => CreateGenericAddressInput)
  address: CreateGenericAddressInput;

  @Field(() => Int, { nullable: true })
  hostelId?: number;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
