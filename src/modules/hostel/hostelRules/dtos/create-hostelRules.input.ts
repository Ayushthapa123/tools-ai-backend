import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHostelRulesInput {
  @Field(() => Int)
  hostelId: number;

  @Field()
  rules: string; // JSON string
}

