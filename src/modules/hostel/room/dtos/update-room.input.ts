import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRoomInput } from './create-room.input';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => Int)
  id: number;
}
