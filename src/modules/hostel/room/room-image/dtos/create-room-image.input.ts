import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomImageInput {
  @Field()
  roomId: number;

  @Field()
  url: string;

  @Field()
  caption: string;
}
