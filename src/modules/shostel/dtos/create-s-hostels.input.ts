import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSHostelsInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  street?: string;
}
