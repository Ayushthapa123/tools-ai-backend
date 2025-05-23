import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field()
  id: number;
}
