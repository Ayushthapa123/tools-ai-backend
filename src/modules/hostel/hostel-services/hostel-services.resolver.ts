import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HostelServicesService } from './hostel-services.service';
import { HostelService, HostelServiceList } from '@src/models/global.model';
import { CreateHostelServiceDto } from './dto/createHostelService.dto';
import { UpdateHostelServiceDto } from './dto/updateHostelService.dto';
@Resolver()
export class HostelServicesResolver {
  constructor(private readonly hostelServicesService: HostelServicesService) {}

  @Query(() => HostelServiceList)
  async getAllHostelServices() {
    return this.hostelServicesService.findAll();
  }
  
  @Query(() => HostelService)
  async getHostelServiceById(@Args('id') id: number) {
    return this.hostelServicesService.findById(id);
  }
  
  @Query(() => HostelServiceList)
  async getHostelServicesByHostelId(@Args('hostelId') hostelId: number) {
    const results = await this.hostelServicesService.findByHostelId(hostelId);
    console.log(results);
    return results;
  }

  @Mutation(() => HostelService)
  async createHostelService(@Args('input') input: CreateHostelServiceDto) {
    return this.hostelServicesService.create(input);
  }

  @Mutation(() => HostelService)
  async updateHostelService(@Args('input') input: UpdateHostelServiceDto) {
    return this.hostelServicesService.update(input);
  }

  @Mutation(() => HostelService)
  async deleteHostelService(@Args('id') id: number) {
    return this.hostelServicesService.delete(id);
  }
  
  @Mutation(() => HostelService)
  async cancelHostelService(@Args('id') id: number) {
    return this.hostelServicesService.cancel(id);
  }

  @Mutation(() => HostelService)
  async completeHostelService(@Args('id') id: number) {
    return this.hostelServicesService.complete(id);
  }
  
}
