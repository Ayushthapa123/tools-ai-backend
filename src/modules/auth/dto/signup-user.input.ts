// auth.dto.ts
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';
import { CreateUserInput } from '@src/modules/users/create-user.dto';
@InputType()
export class SignupInput extends PartialType(CreateUserInput) {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  @Field()
  userType: UserType;
}
