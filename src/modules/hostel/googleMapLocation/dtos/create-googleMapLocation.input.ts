import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGoogleMapLocationInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
