// create-user.dto.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;
}
