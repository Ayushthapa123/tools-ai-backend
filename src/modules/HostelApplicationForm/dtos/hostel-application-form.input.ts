import { InputType, Field, Int } from '@nestjs/graphql';
import { RoomCapacity, Status } from '@prisma/client';

@InputType()
export class CreateHostelApplicationFormInput {
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

  @Field(() => String)
  institutionName: string;

  @Field(() => String)
  permanentAddress: string;

  @Field(() => Boolean, { defaultValue: false })
  askForDiscount: boolean;

  @Field(() => Int, { nullable: true })
  discountPercentage?: number;

  @Field({ nullable: true })
  status?: Status;

  @Field(() => RoomCapacity, { nullable: true })
  roomCapacity?: RoomCapacity;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => String, { nullable: true })
  checkinDate?: string;

  @Field(() => String, { nullable: true })
  checkoutDate?: string;
}
