// src/users/user.model.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

//this obj is directly linked with playground
@ObjectType()
export class Users {
  @Field(() => ID)
  userId: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
