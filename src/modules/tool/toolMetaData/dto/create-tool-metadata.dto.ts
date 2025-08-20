import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateToolMetaDataDto {
  @Field(() => String)
  title: string;

  @Field()
  description: string;

  @Field()
  keywords: string;

  @Field()
  ogTitle: string;

  @Field()
  ogDescription: string;

  @Field()
  ogImageUrl: string;

  @Field()
  toolId: number;
}
