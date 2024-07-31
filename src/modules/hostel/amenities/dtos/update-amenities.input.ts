
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAmenitiesInput {
  @Field({ nullable: true })
  amenities?: string; // JSON string
}