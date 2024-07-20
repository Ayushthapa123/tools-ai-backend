import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SettingsService } from './settings.services';
import { HostelSettings } from '@src/models/global.model';
import { CreateHostelSettingsInput } from './dtos/create-settings.input';
import { UpdateHostelSettingsInput } from './dtos/update-settings.input';

@Resolver(() => HostelSettings)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => HostelSettings, { nullable: true })
  async getSettingsByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<HostelSettings | null> {
    return this.settingsService.getSettingsByHostelId(hostelId);
  }

  @Mutation(() => HostelSettings)
  async createSettings(
    @Args('hostelId') hostelId: number,
    @Args('data') data: CreateHostelSettingsInput,
  ): Promise<HostelSettings> {
    return this.settingsService.createSettings(hostelId, data);
  }

  @Mutation(() => HostelSettings)
  async updateSettings(
    @Args('hostelSettingId') hostelSettingId: number,
    @Args('data') data: UpdateHostelSettingsInput,
  ): Promise<HostelSettings> {
    return this.settingsService.updateSettings(hostelSettingId, data);
  }

  @Mutation(() => HostelSettings)
  async deleteSettings(
    @Args('hostelSettingId') hostelSettingId: number,
  ): Promise<HostelSettings> {
    return this.settingsService.deleteSettings(hostelSettingId);
  }
}
