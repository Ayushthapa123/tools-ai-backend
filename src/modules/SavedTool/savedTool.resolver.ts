import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SavedToolService } from './savedTool.service';
import { CreateSavedTool } from './dto/create-saved-tool.dto';
import { UpdateSavedTool } from './dto/update-saved-tool.dto';
import { SavedTool } from '@src/models/global.model';

@Resolver('SavedTool')
export class SavedToolResolver {
  constructor(private readonly savedToolService: SavedToolService) {}

  @Mutation(() => SavedTool)
  async createSavedTool(
    @Args('createSavedToolInput') createSavedTool: CreateSavedTool,
  ) {
    console.log('ccccccccc', createSavedTool);
    return this.savedToolService.createSavedTool(createSavedTool);
  }

  @Query(() => SavedTool)
  async getSavedToolsByToolId(@Args('toolId') toolId: number) {
    return this.savedToolService.getSavedToolsByToolId(toolId);
  }

  @Query(() => SavedTool)
  async getSavedToolById(@Args('id') id: number) {
    return this.savedToolService.getSavedToolById(id);
  }

  @Mutation(() => SavedTool)
  async updateSavedTool(
    @Args('updateSavedToolInput') updateSavedTool: UpdateSavedTool,
  ) {
    return this.savedToolService.updateSavedTool(updateSavedTool);
  }

  @Mutation(() => SavedTool)
  async removeSavedTool(@Args('id') id: number) {
    return this.savedToolService.removeSavedTool(id);
  }
}
