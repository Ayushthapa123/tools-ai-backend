import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSearchQueriesInput } from './create-search-queries.input';

@InputType()
export class UpdateSearchQueriesInput extends PartialType(
  CreateSearchQueriesInput,
) {}
