import { InputType, Field, Int } from '@nestjs/graphql';
import { RoomCapacity, RoomStatus } from '@src/models/global.enum';
import { RoomImageInput } from './room-image.input';
import { CreatePriceInput } from '../price/dtos/create-price.input';

@InputType()
export class CreateRoomInput {
  @Field(() => RoomStatus)
  status: RoomStatus;

  @Field(() => RoomCapacity)
  capacity: RoomCapacity;

  @Field(() => String)
  caption: string;

  @Field(() => String, { nullable: true })
  roomNumber?: string;

  @Field(() => String, { nullable: true })
  maxOccupancy?: string;

  @Field(() => Boolean, { nullable: true })
  attachBathroom?: boolean;

  @Field(() => Int)
  homestayId: number;

  @Field(() => CreatePriceInput, { nullable: true })
  price?: CreatePriceInput;

  @Field(() => [RoomImageInput], { nullable: true })
  images?: RoomImageInput[];

  @Field(() => String, { nullable: true })
  description?: string;
}
