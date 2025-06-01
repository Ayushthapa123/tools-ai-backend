import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceOptionInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  iconUrl?: string;
}
