import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { HostelService } from './hostel.service';
import { Hostel } from '@src/models/global.model';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { UpdateHostelInput } from './dtos/update-hostel.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

// import { Controller } from '@nestjs/common';

@Resolver(() => Hostel)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class HostelResolver {
  constructor(private readonly hostelService: HostelService) {}

  @Query(() => [Hostel])
  async getAllHostels(
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
  ): Promise<Hostel[]> {
    return this.hostelService.getAllHostels(pageSize, pageNumber);
  }
  @Query(() => Hostel, { nullable: true })
  async getHostelById(
    @Args('hostelId') hostelId: number,
  ): Promise<Hostel | null> {
    return this.hostelService.getHostelById(hostelId);
  }

  @Query(() => Hostel, { nullable: true })
  @UseGuards(AuthGuard)
  async getHostelByToken(@Context() ctx: any) {
    const userId = Number(ctx.user.sub);

    return this.hostelService.getHostelBytoken(userId);
  }

  @Query(() => Hostel, { nullable: true })
  async getHostelBySlug(@Args('slug') slug: string): Promise<Hostel | null> {
    return this.hostelService.getHostelBySlug(slug);
  }

  @Mutation(() => Hostel)
  @UseGuards(AuthGuard)
  async createHostel(
    @Context() ctx: any,
    @Args('data') data: CreateHostelInput,
  ): Promise<Hostel> {
    const userId = Number(ctx.user.sub);
    return this.hostelService.createHostel(userId, data);
  }

  @Mutation(() => Hostel)
  async updateHostel(
    @Args('hostelId') hostelId: number,
    @Args('data') data: UpdateHostelInput,
  ): Promise<Hostel> {
    return this.hostelService.updateHostel(hostelId, data);
  }

  // @Mutation(() => Hostel)
  // async deleteHostel(@Args('hostelId') hostelId: number): Promise<Hostel> {
  //   return this.hostelService.deleteHostel(hostelId);
  // }
}
