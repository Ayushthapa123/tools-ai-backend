
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateNearbyPlaceInput } from './create-nearby-place.input';


@InputType()
export class UpdateNearbyPlaceInput extends PartialType(CreateNearbyPlaceInput) {
  @Field(() => ID)
  nearbyPlaceId: number;
}
