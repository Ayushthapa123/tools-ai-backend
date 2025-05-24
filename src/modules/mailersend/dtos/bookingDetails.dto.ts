import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BookingConfirmationEmailDto {
  @Field()
  guestName: string;

  @Field()
  hostelName: string;

  @Field(() => [Int])
  roomName: number[];

  @Field()
  paidAmount: number;

  @Field()
  checkInDate: string;

  @Field()
  checkOutDate: string;
}
