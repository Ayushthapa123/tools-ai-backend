// create-user.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { Gender, UserType } from '@src/models/global.enum';
// import { UserType } from '@src/models/global.enum';
@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field(() => UserType, { defaultValue: UserType.HOSTEL_OWNER })
  userType: UserType;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  altPhoneNumber?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  hostelId?: number;
}
