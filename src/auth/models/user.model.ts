import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from '@src/models/global.model';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: number;

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
  userId: number;
}
@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  userId: number;
}
@ObjectType()
export class UsersAndToken {
  @Field(() => ID)
  userId: number;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  token?: Token;
}

@ObjectType()
export class UsersHostelIdAndToken {
  @Field()
  user: Users;

  @Field()
  token?: Token;
}
