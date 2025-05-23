import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class ConfirmBooking {
  @Field(() => String)
  count: number;
}
