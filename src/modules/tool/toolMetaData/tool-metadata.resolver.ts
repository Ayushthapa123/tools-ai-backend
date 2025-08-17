import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ToolMetaDataService } from './tool-metadata.service';
import { CreateToolMetaDataDto } from './dto/create-tool-metadata.dto';
import { UpdateToolMetaDataDto } from './dto/update-tool-metadata.dto';
import { ToolMetadata } from '@src/models/global.model';

@Resolver('ToolMetaData')
export class ToolMetaDataResolver {
  constructor(private readonly toolMetaDataService: ToolMetaDataService) {}

  @Mutation(() => ToolMetadata)
  async createToolMetaData(
    @Args('createToolMetaDataInput')
    createToolMetaDataDto: CreateToolMetaDataDto,
  ) {
    return this.toolMetaDataService.createToolMetaData(createToolMetaDataDto);
  }

  @Query(() => ToolMetadata)
  async findToolMetaDataByToolId(@Args('toolId') toolId: number) {
    return this.toolMetaDataService.findToolMetaDataByToolId(toolId);
  }

  @Mutation(() => ToolMetadata)
  async updateToolMetaData(
    @Args('updateToolMetaDataInput')
    updateToolMetaDataDto: UpdateToolMetaDataDto,
  ) {
    return this.toolMetaDataService.updateToolMetaData(updateToolMetaDataDto);
  }

  @Mutation(() => ToolMetadata)
  async removeToolMetaData(@Args('id') id: number) {
    return this.toolMetaDataService.removeToolMetaData(id);
  }
}
