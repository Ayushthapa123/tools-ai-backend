// auth.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { UserType } from '@src/users/enums/users.enum';

@InputType()
export class SignupInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
  @Field()
  userType: UserType;
}
