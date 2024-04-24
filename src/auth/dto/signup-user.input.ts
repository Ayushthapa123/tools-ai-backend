// auth.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@InputType()
export class SignupInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  @Field()
  userType?: UserType;
}
