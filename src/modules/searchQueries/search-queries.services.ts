import { Injectable } from '@nestjs/common';
import { SearchQueries } from '@src/models/global.model';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateSearchQueriesInput } from './dtos/create-search-queries.input';
import { UpdateSearchQueriesInput } from './dtos/update-search-queries.input';

@Injectable()
export class SearchQueriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getSearchQueries(query: string): Promise<SearchQueries[]> {
    console.log('qqqqqqqqq', query);
    return await this.prisma.searchQueries.findMany({
      where: {
        OR: [
          { city: { contains: query, mode: 'insensitive' } },
          { subCity: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 7,
    });
  }
  async getAllSearchQueries(): Promise<SearchQueries[]> {
    return await this.prisma.searchQueries.findMany({});
  }

  async getSearchQueryById(
    searchQueryId: number,
  ): Promise<SearchQueries | null> {
    return await this.prisma.searchQueries.findUnique({
      where: { searchQueryId },
    });
  }

  async createSearchQuery(
    data: CreateSearchQueriesInput,
  ): Promise<SearchQueries> {
    const searchQuery = await this.prisma.searchQueries.findFirst({
      where: { country: data.country, city: data.city, subCity: data.subCity },
    });
    console.log('findsearc', searchQuery);
    if (!searchQuery) {
      return this.prisma.searchQueries.create({
        data,
      });
    } else {
      return null;
    }
  }

  async updateSearchQuery(
    searchQueryId: number,
    data: UpdateSearchQueriesInput,
  ): Promise<SearchQueries> {
    const searchQuery = this.prisma.searchQueries.findFirst({
      where: { country: data.country, city: data.city, subCity: data.subCity },
    });

    if (!searchQuery) {
      return this.prisma.searchQueries.update({
        where: { searchQueryId },
        data,
      });
    } else {
      return null;
    }
  }

  async deleteSearchQuery(searchQueryId: number): Promise<SearchQueries> {
    return await this.prisma.searchQueries.delete({
      where: { searchQueryId },
    });
  }
}
