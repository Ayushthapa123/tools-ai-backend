import { InputType, Field, } from '@nestjs/graphql';



@InputType()
export class UpdateHostelRulesInput {
  @Field({ nullable: true })
  rules?: string; // JSON string
}
