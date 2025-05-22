import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBookingInput } from './create-booking.input';

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => Int)
  id: number;
}
