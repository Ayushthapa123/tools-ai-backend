// create-user.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { GenderType, UserType } from '@src/models/global.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field(() => UserType, { defaultValue: UserType.USER })
  userType: UserType;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  altPhoneNumber?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;
}
