import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { SearchHostelInput } from './dtos/search-hostel.input';

@Injectable()
export class SearchHostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getHostels(input: SearchHostelInput) {
    const pageSize = 10;
    const skip = (input.pageNumber - 1) * pageSize;
    const take = pageSize;
    const hostelType = input.hostelType;
    const genderType = input.genderType;
    const city = input.city;
    const subCity = input.subCity;
    const oneSeater = input.oneSeater;
    const twoSeater = input.twoSeater;
    const threeSeater = input.threeSeater;
    const fourSeater = input.fourSeater;
    const fiveSeater = input.fiveSeater;
    // const minRating = input.minRating;
    // const maxPrice = input.maxPrice;

    //logic make filter
    return this.prisma.hostel.findMany({
      skip,
      take,

      include: {
        address: true,
        roomAvailability: true,
        MonthlyPricing: true,
        gallery: { where: { type: 'COVER' } },
      },
      where: {
        hostelType,
        genderType,
        roomAvailability: {
          oneSeater,
          twoSeater,
          threeSeater,
          fourSeater,
          fiveSeater,
        },
        address: {
          city: { contains: city },
          subCity: { contains: subCity },
        },
      },
    });
  }
}
