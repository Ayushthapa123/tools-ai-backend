import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { SearchSHostelInput } from './dtos/search-hostel.input';

@Injectable()
export class SearchSHostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getHostels(input: SearchSHostelInput) {
    const pageSize = 10;
    const skip = (input.pageNumber - 1) * pageSize;
    const take = pageSize;
    const hostelType = input.hostelType;
    const genderType = input.genderType;
    const city = input.city;
    const subCity = input.subCity;
    console.log('cccccccccccccc', city);

    // const minRating = input.minRating;
    // const maxPrice = input.maxPrice;

    //logic make filter
    return this.prisma.sHostels.findMany({
      skip,
      take,

      where: {
        hostelType,
        genderType,

        city: { contains: city },
        subCity: { contains: subCity },
      },
    });
  }
}
