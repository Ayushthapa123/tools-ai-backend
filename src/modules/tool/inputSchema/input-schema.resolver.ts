import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputSchemaService } from './input-schema.service';
import { CreateInputSchema } from './dto/create-input-schema.dto';
import { UpdateInputSchema } from './dto/update-input-schema.dto';
import { InputSchema } from '@src/models/global.model';

@Resolver('InputSchema')
export class InputSchemaResolver {
  constructor(private readonly inputSchemaService: InputSchemaService) {}

  @Mutation(() => InputSchema)
  async createInputSchema(
    @Args('createInputSchemaInput') createInputSchema: CreateInputSchema,
  ) {
    return this.inputSchemaService.createInputSchema(createInputSchema);
  }

  @Query(() => InputSchema)
  async findInputSchemaByToolId(@Args('toolId') toolId: number) {
    return this.inputSchemaService.findByToolId(toolId);
  }

  @Mutation(() => InputSchema)
  async updateInputSchema(
    @Args('updateInputSchemaInput') updateInputSchema: UpdateInputSchema,
  ) {
    return this.inputSchemaService.updateInputSchema(updateInputSchema);
  }

  @Mutation(() => InputSchema)
  async removeInputSchema(@Args('id') id: number) {
    return this.inputSchemaService.removeInputSchema(id);
  }
}
