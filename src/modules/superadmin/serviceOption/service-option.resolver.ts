import { ServiceOption, ServiceOptionList } from '@src/models/global.model';
import { ServiceOptionService } from './service-option.services';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CreateServiceOptionInput } from './dtos/create-service-option.input';
import { UpdateServiceOptionInput } from './dtos/update-service-option.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { CtxType } from '@src/models/global.model';
import { UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Resolver(() => ServiceOption)
export class ServiceOptionResolver {
  constructor(private readonly serviceOptionService: ServiceOptionService) {}

  @Query(() => ServiceOption, { name: 'serviceOptionById' })
  async getServiceOptionById(@Args('id', { type: () => Int }) id: number) {
    return this.serviceOptionService.getServiceOptionById(id);
  }

  @Query(() => ServiceOptionList, { name: 'serviceOptions' })
  async serviceOptions(@Context() ctx: CtxType) {
    const userType = ctx.user.userType;
    if (userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.serviceOptionService.getAll();
  }

  @Mutation(() => ServiceOption)
  async createServiceOption(
    @Args('createServiceOptionInput')
    createServiceOptionInput: CreateServiceOptionInput,
  ): Promise<ServiceOption | null> {
    return this.serviceOptionService.create(createServiceOptionInput);
  }

  @Mutation(() => ServiceOption)
  async updateServiceOption(
    @Args('serviceOptionId', { type: () => Int }) serviceOptionId: number,
    @Args('updateServiceOptionInput')
    updateServiceOptionInput: UpdateServiceOptionInput,
  ): Promise<ServiceOption | null> {
    return this.serviceOptionService.update(
      serviceOptionId,
      updateServiceOptionInput,
    );
  }

  @Mutation(() => ServiceOption)
  async deleteServiceOption(
    @Context() ctx: CtxType,
    @Args('serviceOptionId', { type: () => Int }) serviceOptionId: number,
  ): Promise<ServiceOption> {
    const userType = ctx.user.userType;
    if (userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.serviceOptionService.delete(serviceOptionId);
  }
}
