// src/users/user.model.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  // Add other user fields as needed
}
