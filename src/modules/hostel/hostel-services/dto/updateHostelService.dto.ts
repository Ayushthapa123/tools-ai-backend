import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateHostelServiceDto } from './createHostelService.dto';

@InputType()
export class UpdateHostelServiceDto extends PartialType(
  CreateHostelServiceDto,
) {
  @Field(() => ID)
  id: number;
}
