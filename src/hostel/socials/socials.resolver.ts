import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SocialsService } from './socialss.service';
import { Socials } from '@src/models/global.model';
import { CreateSocialsInput } from './dtos/create-socials.input';
import { UpdateSocialsInput } from './dtos/update-socials.input';

// import { Controller } from '@nestjs/common';

@Resolver(() => Socials)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class SocialsResolver {
  constructor(private readonly socialsService: SocialsService) {}

  @Query(() => Socials, { nullable: true })
  async getSocialsByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<Socials | null> {
    return this.socialsService.getSocialsByHostelId(hostelId);
  }

  @Mutation(() => Socials)
  async createSocials(
    @Args('data') data: CreateSocialsInput,
  ): Promise<Socials> {
    return this.socialsService.createSocials(data);
  }

  @Mutation(() => Socials)
  async updateSocials(
    @Args('socialsId') socialsId: number,
    @Args('data') data: UpdateSocialsInput,
  ): Promise<Socials> {
    return this.socialsService.updateSocials(socialsId, data);
  }
}
