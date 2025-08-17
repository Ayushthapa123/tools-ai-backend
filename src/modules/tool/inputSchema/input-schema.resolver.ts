import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputSchemaService } from './input-schema.service';
import { CreateInputSchemaDto } from './dto/create-input-schema.dto';
import { UpdateInputSchemaDto } from './dto/update-input-schema.dto';
import { InputSchema } from '@src/models/global.model';

@Resolver('InputSchema')
export class InputSchemaResolver {
  constructor(private readonly inputSchemaService: InputSchemaService) {}

  @Mutation(() => InputSchema)
  async createInputSchema(
    @Args('createInputSchemaInput') createInputSchemaDto: CreateInputSchemaDto,
  ) {
    return this.inputSchemaService.createInputSchema(createInputSchemaDto);
  }

  @Query(() => InputSchema)
  async findInputSchemaByToolId(@Args('toolId') toolId: number) {
    return this.inputSchemaService.findByToolId(toolId);
  }

  @Mutation(() => InputSchema)
  async updateInputSchema(
    @Args('updateInputSchemaInput') updateInputSchemaDto: UpdateInputSchemaDto,
  ) {
    return this.inputSchemaService.updateInputSchema(updateInputSchemaDto);
  }

  @Mutation(() => InputSchema)
  async removeInputSchema(@Args('id') id: number) {
    return this.inputSchemaService.removeInputSchema(id);
  }
}
