// forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TravelChecklistGeneratorInput {
  @Field(() => String)
  startCountry: string;
  @Field(() => String)
  startCity: string;
  @Field(() => String)
  destinationCountry: string;
  @Field(() => String)
  destinationCity: string;

  @Field(() => String)
  travelDuration: string; // within day/1day/2day/3day/4day/1week/2week/3week/1month/
  @Field(() => String)
  travelType: string; //'national' | 'international';
  @Field(() => String)
  travelCompanionType: string; //'solo' | 'family' | 'friends' | 'partner'; // 👈 Added
  @Field(() => [String])
  travelActivities: string[]; //'shopping' | 'food' | 'culture' | 'nature' | 'adventure' | 'relaxation' | 'sports' | 'other';

  @Field(() => String)
  purpose: string;
  @Field(() => Date)
  date: Date;
}
