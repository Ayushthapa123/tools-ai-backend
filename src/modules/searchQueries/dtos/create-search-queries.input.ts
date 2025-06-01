import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSearchQueriesInput {
  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;
}
