import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '@src/models/global.enum';
import { UserData } from '@src/models/global.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;
  @Field()
  fullName: string;
}

@ObjectType()
export class Token {
  @Field(() => ID)
  accessToken?: string;

  @Field()
  refreshToken?: string;
}

@ObjectType()
export class VerifyEmailResponse {
  @Field()
  id?: number;
}
@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  id: number;
}
@ObjectType()
export class UsersAndToken {
  @Field(() => ID)
  id: number;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field(() => UserType)
  userType: UserType;

  @Field()
  token?: Token;
}

@ObjectType()
export class UsersHomestayIdAndToken {
  @Field()
  user: UserData;

  @Field()
  token?: Token;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
