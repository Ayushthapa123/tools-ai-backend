import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { Services } from '@src/models/global.model';
import { ServicesService } from './services.service';
import { CreateServicesInput } from './dtos/create-services.input';
import { UpdateServicesInput } from './dtos/update-services.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

@Resolver(() => Services)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => Services, { name: 'service' })
  async getServicesById(
    @Args('servicesId', { type: () => Int }) servicesId: number,
  ): Promise<Services | null> {
    return this.servicesService.getServicesById(servicesId);
  }

  @Query(() => Services, { name: 'servicesByHostelId' })
  @UseGuards(AuthGuard)
  async getServicesByHostelId(@Context() ctx: any): Promise<Services | null> {
    const hostelId = ctx.user.hostelId;
    return this.servicesService.getServicesByHostelId(hostelId);
  }

  @Mutation(() => Services)
  async createServices(
    @Args('createServicesInput') createServicesInput: CreateServicesInput,
  ): Promise<Services> {
    return this.servicesService.createServices(createServicesInput);
  }

  @Mutation(() => Services)
  async updateServices(
    @Args('servicesId', { type: () => Int }) servicesId: number,
    @Args('updateServicesInput') updateServicesInput: UpdateServicesInput,
  ): Promise<Services> {
    return this.servicesService.updateServices(servicesId, updateServicesInput);
  }

  @Mutation(() => Services)
  async deleteServices(
    @Args('servicesId', { type: () => Int }) servicesId: number,
  ): Promise<Services> {
    return this.servicesService.deleteServices(servicesId);
  }
}
