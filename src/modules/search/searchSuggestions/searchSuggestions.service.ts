import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

import { SearchQuerys } from '@src/models/global.model';

@Injectable()
export class SearchSuggestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSearchSuggestions(query: string): Promise<SearchQuerys[] | null> {
    const suggestions = await this.prisma.searchQueries.findMany({
      where: {
        OR: [{ city: { contains: query } }, { subCity: { contains: query } }],
      },
      take: 5,
    });

    // Sort suggestions
    const sortedSuggestions = suggestions.sort((a, b) => {
      // Check if either suggestion contains tole
      const aHasTole = !!a.subCity;
      const bHasTole = !!b.subCity;

      // Sort based on whether tole exists or not
      if (aHasTole && !bHasTole) {
        return -1; // a comes before b
      } else if (!aHasTole && bHasTole) {
        return 1; // b comes before a
      } else {
        return 0; // no preference
      }
    });

    return sortedSuggestions;
  }

  async getCitySuggestions(query: string): Promise<SearchQuerys[] | null> {
    const suggestions = await this.prisma.searchQueries.findMany({
      where: {
        city: { contains: query },
        NOT: { subCity: { not: null } }, // Filter out suggestions with tole
      },
      take: 5,
    });

    return suggestions;
  }

  async getToleSuggestions(query: string): Promise<SearchQuerys[] | null> {
    const suggestions = await this.prisma.searchQueries.findMany({
      where: {
        subCity: { contains: query },
      },
      take: 10,
    });

    return suggestions;
  }
}
