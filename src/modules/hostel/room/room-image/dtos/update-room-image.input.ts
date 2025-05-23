import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRoomImageInput {
  @Field()
  id: number;

  @Field()
  caption: string;

  @Field()
  url: string;
}
