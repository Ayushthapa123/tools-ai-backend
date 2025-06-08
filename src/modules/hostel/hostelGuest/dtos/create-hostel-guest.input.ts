import { InputType, Field, Int } from '@nestjs/graphql';
import { Gender } from '@src/models/global.enum';

@InputType()
export class CreateHostelGuestInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  emergencyContact?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;

  @Field(() => String, { nullable: true })
  nationality?: string;

  @Field(() => String, { nullable: true })
  permanentAddress?: string;

  @Field(() => String, { nullable: true })
  religion?: string;

  @Field(() => String, { nullable: true })
  occupation?: string;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  profilePicture?: string;

  @Field(() => Int)
  hostelId: number;

  @Field(() => Int, { nullable: true })
  roomId?: number;

  @Field(() => String, { nullable: true })
  checkinDate?: string;

  @Field(() => String, { nullable: true })
  checkoutDate?: string;
}
