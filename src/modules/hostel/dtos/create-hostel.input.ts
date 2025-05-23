import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHostelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
