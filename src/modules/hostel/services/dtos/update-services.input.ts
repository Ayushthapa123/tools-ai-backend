import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class UpdateServicesInput {
  @Field({ nullable: true })
  amenities?: string; // JSON string
}
