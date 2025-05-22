import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHomestayWallpaperInput {
  @Field()
  homestayId: number;

  @Field()
  url: string;

  @Field()
  caption: string;
}
