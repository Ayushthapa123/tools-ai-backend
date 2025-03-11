import { Injectable } from '@nestjs/common';
import { SHostels } from '@src/models/global.model';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateSHostelsInput } from './dtos/create-s-hostels.input';
import { UpdateSHostelsInput } from './dtos/update-s-hostels.input';

@Injectable()
export class SHostelsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSHostelsById(sHostelsId: number): Promise<SHostels | null> {
    return this.prisma.sHostels.findUnique({
      where: { sHostelsId },
    });
  }

  async getSHostelsBySlug(slug: string): Promise<SHostels | null> {
    const decodedSlug = decodeURIComponent(slug);
    console.log('dddddddddddddddd', decodedSlug);
    return this.prisma.sHostels.findUnique({
      where: { slug: decodedSlug },
    });
  }

  async getSHostels(): Promise<SHostels[]> {
    const h= await  this.prisma.sHostels.findMany({});
    console.log('hhhhhhhhhhhhhhhh',h)
    return h
  }

  async createSHostels(data: CreateSHostelsInput): Promise<SHostels> {
    //check whether a searchQueries already have address
    const searchCity = await this.prisma.searchQueries.findFirst({
      where: {
        city: {
          equals: data.city,
          mode: 'insensitive',
        },
        country: {
          equals: data.country,
          mode: 'insensitive',
        },
      },
    });
    if (!searchCity) {
      //create searchquery with just country and city
      await this.prisma.searchQueries.create({
        data: {
          country: data.country.toLowerCase(),
          city: data.city.toLowerCase(),
        },
      });
    }
    const searchSubCity = await this.prisma.searchQueries.findFirst({
      where: {
        subCity: data.subCity.toLowerCase(),
        city: data.city.toLowerCase(),
        country: data.country.toLowerCase(),
      },
    });
    if (!searchSubCity && data.subCity) {
      //create searchquery with country and city subcity
      await this.prisma.searchQueries.create({
        data: {
          country: data.country.toLowerCase(),
          city: data.city.toLowerCase(),
          subCity: data.subCity.toLowerCase(),
        },
      });
    }

    return this.prisma.sHostels.create({
      data: { ...data },
    });
  }

  async updateSHostels(
    sHostelsId: number,
    data: UpdateSHostelsInput,
  ): Promise<SHostels> {
    return this.prisma.sHostels.update({
      where: { sHostelsId },
      data,
    });
  }

  async deleteSHostels(sHostelsId: number): Promise<SHostels> {
    return this.prisma.sHostels.delete({
      where: { sHostelsId },
    });
  }
}
