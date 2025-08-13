import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CustomerAvatarGeneratorInput {
  @Field(() => String)
  businessName: string;

  @Field(() => String)
  businessDescription: string;
}
