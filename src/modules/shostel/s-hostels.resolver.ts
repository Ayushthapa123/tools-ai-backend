import { SHostels } from '@src/models/global.model';
import { SHostelsService } from './s-hostels.service';
import { CreateSHostelsInput } from './dtos/create-s-hostels.input';
import { UpdateSHostelsInput } from './dtos/update-s-hostels.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => SHostels)
export class SHostelsResolver {
  constructor(private readonly sHostelsService: SHostelsService) {}

  @Query(() => SHostels, { name: 'sHostel' })
  async getSHostelsById(
    @Args('sHostelsId', { type: () => Int }) sHostelsId: number,
  ): Promise<SHostels | null> {
    return this.sHostelsService.getSHostelsById(sHostelsId);
  }

  @Query(() => SHostels, { name: 'sHostelBySlug' })
  async getSHostelsBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<SHostels | null> {
    return this.sHostelsService.getSHostelsBySlug(slug);
  }

  @Query(() => [SHostels], { name: 'sHostels' })
  async getSHostels(): Promise<SHostels[]> {
    return this.sHostelsService.getSHostels();
  }

  @Mutation(() => SHostels)
  async createSHostels(
    @Args('createSHostelsInput') createSHostelsInput: CreateSHostelsInput,
  ): Promise<SHostels> {
    return this.sHostelsService.createSHostels(createSHostelsInput);
  }

  @Mutation(() => SHostels)
  async updateSHostels(
    @Args('sHostelsId', { type: () => Int }) sHostelsId: number,
    @Args('updateSHostelsInput') updateSHostelsInput: UpdateSHostelsInput,
  ): Promise<SHostels> {
    return this.sHostelsService.updateSHostels(sHostelsId, updateSHostelsInput);
  }

  @Mutation(() => SHostels)
  async deleteSHostels(
    @Args('sHostelsId', { type: () => Int }) sHostelsId: number,
  ): Promise<SHostels> {
    return this.sHostelsService.deleteSHostels(sHostelsId);
  }
}
