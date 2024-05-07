import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchHostelService } from './searchHostel.service';
import { Hostel } from '@src/models/global.model';
import { SearchHostelInput } from './dtos/search-hostel.input';

@Resolver(() => Hostel)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class SearchHostelResolver {
  constructor(private readonly hostelService: SearchHostelService) {}

  @Query(() => [Hostel])
  async getHostelsBySearch(
    @Args('input') input: SearchHostelInput,
  ): Promise<Hostel[]> {
    return this.hostelService.getHostels(input);
  }
}
