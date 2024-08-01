import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateNearbyPlaceInput } from './create-nearby-place.input';

@InputType()
export class UpdateNearbyPlaceInput extends PartialType(
  CreateNearbyPlaceInput,
) {
  @Field(() => Int)
  nearbyPlaceId: number;
}
