// forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TravelBudgetCalculatorInput {
  @Field(() => String)
  startCountry: string;
  @Field(() => String)
  startCity: string;
  @Field(() => String)
  travelCountry: string;
  @Field(() => String)
  travelCity: string;
  @Field(() => String)
  travelStyle: string;
  @Field(() => String)
  accomodationType: string;
  @Field(() => Number)
  numberOfDays: number;
  @Field(() => String)
  purpose: string;
  @Field(() => Date)
  date: Date;
}
