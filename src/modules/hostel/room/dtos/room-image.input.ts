import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RoomImageInput {
  @Field({ nullable: true })
  caption?: string;

  @Field()
  url: string;
}
