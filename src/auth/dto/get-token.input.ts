// auth.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetTokenInput {
  @Field()
  userId: number;

  @Field()
  refreshToken: string;
}
