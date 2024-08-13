import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateSearchQueriesInput {
  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  subCity?: string;
}
