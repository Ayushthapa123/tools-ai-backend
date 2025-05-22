import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  homestayId: number;
  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  altPhone?: string;
}
