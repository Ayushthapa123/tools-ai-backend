import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHomestayInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
