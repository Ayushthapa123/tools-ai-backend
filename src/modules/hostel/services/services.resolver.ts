import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '@src/models/global.model';

@Resolver('Service')
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  async createService(
    @Args('createServiceInput') createServiceDto: CreateServiceDto,
  ) {
    return this.servicesService.createService(createServiceDto);
  }

  @Query(() => Service)
  async findServiceByHomestayId(@Args('homestayId') homestayId: number) {
    return this.servicesService.findByHomestayId(homestayId);
  }

  @Mutation(() => Service)
  async updateService(
    @Args('updateServiceInput') updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(updateServiceDto);
  }

  @Mutation(() => Service)
  async removeService(@Args('id') id: number) {
    return this.servicesService.removeService(id);
  }
}
