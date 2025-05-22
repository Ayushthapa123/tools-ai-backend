import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRulesInput {
  @Field(() => Int)
  homestayId: number;

  @Field()
  rules: string; // JSON string
}
