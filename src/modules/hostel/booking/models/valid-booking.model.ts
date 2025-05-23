import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookingSummary {
  @Field(() => Number)
  roomId: number;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => Number, { nullable: true })
  totalPriceOfRoom: number;

  @Field(() => String, { nullable: true })
  priceType: string;
}

@ObjectType()
export class ValidInvalidBooking {
  @Field(() => Boolean)
  isValid: boolean;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Number, { nullable: true })
  totalPrice: number;

  @Field(() => Number, { nullable: true })
  totalDays: number;

  @Field(() => [BookingSummary], { nullable: true })
  bookingSummary?: BookingSummary[];
}
