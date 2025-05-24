import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SettingsService } from './settings.services';
import { HostelSetting } from '@src/models/global.model';
import { CreateHostelSettingsInput } from './dtos/create-settings.input';
import { UpdateHostelSettingsInput } from './dtos/update-settings.input';

@Resolver(() => HostelSetting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => HostelSetting, { nullable: true })
  async getSettingsByHostelId(@Args('hostelId') hostelId: number) {
    return this.settingsService.getSettingsByHostelId(hostelId);
  }

  @Mutation(() => HostelSetting)
  async createSettings(
    @Args('hostelId') hostelId: number,
    @Args('data') data: CreateHostelSettingsInput,
  ) {
    return this.settingsService.createSettings(hostelId, data);
  }

  @Mutation(() => HostelSetting)
  async updateSettings(
    @Args('hostelSettingId') hostelSettingId: number,
    @Args('data') data: UpdateHostelSettingsInput,
  ) {
    return this.settingsService.updateSettings(hostelSettingId, data);
  }

  @Mutation(() => HostelSetting)
  async deleteSettings(@Args('hostelSettingId') hostelSettingId: number) {
    return this.settingsService.deleteSettings(hostelSettingId);
  }
}
