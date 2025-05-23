import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateRoomAmenityInput {
  @Field(() => GraphQLJSON)
  amenity: any;

  @Field(() => Int)
  roomId: number;
}
