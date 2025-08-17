// auth.dto.ts
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from '@src/modules/users/create-user.dto';
@InputType()
export class SignupInput extends PartialType(CreateUserInput) {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullName: string;
}
