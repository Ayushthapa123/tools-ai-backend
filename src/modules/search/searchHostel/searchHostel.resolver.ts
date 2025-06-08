import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchHostelService } from './searchHostel.service';
import { Hostel, HostelList } from '@src/models/global.model';
import { SearchHostelInput } from './dtos/search-hostel.input';

@Resolver(() => Hostel)
export class SearchHostelResolver {
  constructor(private readonly hostelService: SearchHostelService) {}

  @Query(() => HostelList)
  async getHostelsBySearch(@Args('input') input: SearchHostelInput) {
    return this.hostelService.getHostels(input);
  }
}
