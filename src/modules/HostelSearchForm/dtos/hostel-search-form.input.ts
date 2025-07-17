import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressInput } from '@src/modules/hostel/address/dtos/create-address.input';
import { HostelGenderType, HostelType, RoomCapacity } from '@prisma/client';

@InputType()
export class CreateHostelSearchFormInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String)
  occupation: string;

  @Field({ nullable: false })
  hostelType: HostelType;

  @Field({ nullable: false })
  hostelGenderType: HostelGenderType;

  @Field({ nullable: true })
  roomCapacity?: RoomCapacity;

  @Field(() => String, { nullable: true })
  checkinDate?: string;

  @Field(() => String, { nullable: true })
  checkoutDate?: string;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => CreateAddressInput, { nullable: true })
  address?: CreateAddressInput;
}
