import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRulesInput {
  @Field({ nullable: true })
  rules?: string; // JSON string
}
