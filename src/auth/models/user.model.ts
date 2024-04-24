import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: number;

  @Field()
  email: string;
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType()
export class Token {
  @Field(() => ID)
  accessToken?: string;

  @Field()
  refreshToken?: string;
}

@ObjectType()
export class UsersAndToken {
  @Field(() => ID)
  userId: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
  @Field()
  token?: Token;
}
