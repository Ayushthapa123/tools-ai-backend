import { Field, InputType, Int } from '@nestjs/graphql';
import { BookingStatus, PaymentPlatformName } from '@src/models/global.enum';
@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => String)
  bookingKey: string;

  @Field(() => Int)
  guestId: number;

  @Field(() => String)
  paymentPlatformName: PaymentPlatformName;

  @Field(() => BookingStatus)
  status: BookingStatus;
}
