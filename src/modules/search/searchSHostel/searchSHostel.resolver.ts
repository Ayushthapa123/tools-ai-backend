import { SHostels } from '@src/models/global.model';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchSHostelService } from './searchSHostel.service';
import { SearchSHostelInput } from './dtos/search-hostel.input';

@Resolver(() => SHostels)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class SearchSHostelResolver {
  constructor(private readonly hostelService: SearchSHostelService) {}

  @Query(() => [SHostels])
  async getSHostelsBySearch(
    @Args('input') input: SearchSHostelInput,
  ): Promise<SHostels[]> {
    return this.hostelService.getHostels(input);
  }
}
