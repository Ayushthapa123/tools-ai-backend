// forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GoogleINput {
  @Field()
  email: string;
}

@InputType()
export class SignupWithGoogleInput {
  @Field()
  token: string;
}
