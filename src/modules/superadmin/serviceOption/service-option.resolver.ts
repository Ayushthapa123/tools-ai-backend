import { ServiceOption, ServiceOptionList } from '@src/models/global.model';
import { ServiceOptionService } from './service-option.services';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateServiceOptionInput } from './dtos/create-service-option.input';
import { UpdateServiceOptionInput } from './dtos/update-service-option.input';

@Resolver(() => ServiceOption)
export class ServiceOptionResolver {
  constructor(private readonly serviceOptionService: ServiceOptionService) {}

  @Query(() => ServiceOption, { name: 'serviceOptionById' })
  async getServiceOptionById(@Args('id', { type: () => Int }) id: number) {
    return this.serviceOptionService.getServiceOptionById(id);
  }

  @Query(() => ServiceOptionList, { name: 'serviceOptions' })
  async serviceOptions() {
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
    @Args('serviceOptionId', { type: () => Int }) serviceOptionId: number,
  ): Promise<ServiceOption> {
    return this.serviceOptionService.delete(serviceOptionId);
  }
}
