import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DomainNameGeneratorInput {
  @Field(() => String)
  businessName: string;

  @Field(() => String)
  businessDescription: string;

  @Field(() => String)
  customPrompt?: string;

  @Field(() => String)
  domainExtension?: string;
}
