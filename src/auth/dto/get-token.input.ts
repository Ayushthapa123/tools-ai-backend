// auth.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetTokenInput {
  @Field()
  refreshToken: string;
}

@InputType()
export class VerifyEmailInput {
  @Field()
  token: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  token: string;
  @Field()
  password: string;
}
