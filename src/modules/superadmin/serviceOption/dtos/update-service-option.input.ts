import { InputType, PartialType } from '@nestjs/graphql';
import { CreateServiceOptionInput } from './create-service-option.input';

@InputType()
export class UpdateServiceOptionInput extends PartialType(
  CreateServiceOptionInput,
) {}
