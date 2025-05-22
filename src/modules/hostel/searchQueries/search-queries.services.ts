import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateSearchQueriesInput } from './dtos/create-search-queries.input';
import { UpdateSearchQueriesInput } from './dtos/update-search-queries.input';

@Injectable()
export class SearchQueriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getSearchQueries(query: string) {
    const res = await this.prisma.searchQueries.findMany({
      where: {
        OR: [
          { city: { contains: query, mode: 'insensitive' } },
          { subCity: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 7,
    });
    return {
      data: res,
      error: null,
    };
  }
  async getAllSearchQueries() {
    const res = await this.prisma.searchQueries.findMany({});
    return {
      data: res,
      error: null,
    };
  }

  async getSearchQueryById(searchQueryId: number) {
    const res = await this.prisma.searchQueries.findUnique({
      where: { id: searchQueryId },
    });
    return {
      data: [res],
      error: null,
    };
  }

  async createSearchQuery(data: CreateSearchQueriesInput) {
    const searchQuery = await this.prisma.searchQueries.findFirst({
      where: { country: data.country, city: data.city, subCity: data.subCity },
    });
    if (!searchQuery) {
      const res = await this.prisma.searchQueries.create({
        data,
      });
      return {
        data: [res],
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Search query already exists',
        },
      };
    }
  }

  async updateSearchQuery(
    searchQueryId: number,
    data: UpdateSearchQueriesInput,
  ) {
    const searchQuery = this.prisma.searchQueries.findFirst({
      where: { country: data.country, city: data.city, subCity: data.subCity },
    });

    if (!searchQuery) {
      const res = await this.prisma.searchQueries.update({
        where: { id: searchQueryId },
        data,
      });
      return {
        data: [res],
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Search query already exists',
        },
      };
    }
  }

  async deleteSearchQuery(searchQueryId: number) {
    const res = await this.prisma.searchQueries.delete({
      where: { id: searchQueryId },
    });
    return {
      data: [res],
      error: null,
    };
  }
}
