// forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordInput {
  @Field()
  email: string;
}
