import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}
