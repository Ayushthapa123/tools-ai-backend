import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { SearchListedAiToolInput } from './dtos/search-listed-ai-tool.input';
import { ListedAiToolData } from '@src/models/global.model';
import { Domain } from '@prisma/client';

@Injectable()
export class SearchListedAiToolService {
  constructor(private readonly prisma: PrismaService) {}

  async searchListedAiTools(input: SearchListedAiToolInput) {
    const pageSize = input.pageSize || 20;
    const pageNumber = input.pageNumber || 1;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    // Build where conditions for filtering
    const whereConditions: any = {};

    // Text search in name, description, and keywords
    if (input.searchTerm && input.searchTerm.trim()) {
      whereConditions.OR = [
        { name: { contains: input.searchTerm.trim(), mode: 'insensitive' } },
        {
          shortDescription: {
            contains: input.searchTerm.trim(),
            mode: 'insensitive',
          },
        },
      ];
    }

    // Filter by tool user types - check if array contains any of the specified types
    if (input.toolUserTypes && input.toolUserTypes.length > 0) {
      whereConditions.toolUserTypes = { hasSome: input.toolUserTypes };
    }

    // Filter by pricing types - check if array contains any of the specified types
    if (input.pricingTypes && input.pricingTypes.length > 0) {
      whereConditions.pricingType = { hasSome: input.pricingTypes };
    }

    // Filter by AI types - check if array contains any of the specified types
    if (input.aiTypes && input.aiTypes.length > 0) {
      whereConditions.aiType = { hasSome: input.aiTypes };
    }

    // Filter by AI capabilities - check if array contains any of the specified types
    if (input.aiCapabilities && input.aiCapabilities.length > 0) {
      whereConditions.aiCapabilities = { hasSome: input.aiCapabilities };
    }

    // Filter by modalities - check if array contains any of the specified types
    if (input.modalities && input.modalities.length > 0) {
      whereConditions.modalities = { hasSome: input.modalities };
    }

    // Filter by delivery methods - check if array contains any of the specified types
    if (input.delivery && input.delivery.length > 0) {
      whereConditions.delivery = { hasSome: input.delivery };
    }

    // Filter by domains - check if array contains any of the specified types
    if (input.domains && input.domains.length > 0) {
      whereConditions.domains = { hasSome: input.domains };
    }

    // Filter by platforms - check if array contains any of the specified types
    if (input.platforms && input.platforms.length > 0) {
      whereConditions.platforms = { hasSome: input.platforms };
    }

    // Filter by integration options - check if array contains any of the specified types
    if (input.integrationOptions && input.integrationOptions.length > 0) {
      whereConditions.integrationOptions = {
        hasSome: input.integrationOptions,
      };
    }

    // Filter by keywords - check if array contains any of the specified keywords
    if (input.keywords && input.keywords.length > 0) {
      whereConditions.keywords = { hasSome: input.keywords };
    }

    // Filter by popularity score range
    if (
      input.minPopularityScore !== undefined ||
      input.maxPopularityScore !== undefined
    ) {
      whereConditions.popularityScore = {};
      if (input.minPopularityScore !== undefined) {
        whereConditions.popularityScore.gte = input.minPopularityScore;
      }
      if (input.maxPopularityScore !== undefined) {
        whereConditions.popularityScore.lte = input.maxPopularityScore;
      }
    }

    // Filter by featured status
    if (input.featured !== undefined) {
      whereConditions.featured = input.featured;
    }

    // Filter by verified status
    if (input.verified !== undefined) {
      whereConditions.verified = input.verified;
    }

    // Filter by date range
    if (input.startDate || input.endDate) {
      whereConditions.createdAt = {};
      if (input.startDate) {
        const startDate = new Date(input.startDate);
        if (!isNaN(startDate.getTime())) {
          whereConditions.createdAt.gte = startDate;
        }
      }
      if (input.endDate) {
        const endDate = new Date(input.endDate);
        if (!isNaN(endDate.getTime())) {
          whereConditions.createdAt.lte = endDate;
        }
      }
    }

    // Filter by research mode (this might need to be implemented based on your business logic)
    if (input.researchMode !== undefined) {
      // Add your research mode logic here
      // This could be based on a specific field or combination of fields
      // For now, I'll leave it as a placeholder
    }

    // Build order by clause
    let orderBy: any = {};
    if (input.sortBy) {
      const sortField = input.sortBy as keyof ListedAiToolData;
      orderBy[sortField] = input.sortOrder || 'desc';
    } else {
      // Default sorting by popularity score and creation date
      orderBy = [{ popularityScore: 'desc' }, { createdAt: 'desc' }];
    }

    try {
      // Get total count for pagination
      const totalCount = await this.prisma.listedAiTool.count({
        where: whereConditions,
      });

      // Get paginated results
      const tools = await this.prisma.listedAiTool.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
      });

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = pageNumber < totalPages;
      const hasPreviousPage = pageNumber > 1;

      return {
        data: tools,
        error: null,
        pagination: {
          total: totalCount,
          page: pageNumber,
          limit: pageSize,
          hasNextPage,
          hasPreviousPage,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error searching listed AI tools:', error);
      return {
        data: [],
        error: {
          message: 'Failed to search AI tools',
          code: 'SEARCH_ERROR',
        },
        pagination: {
          total: 0,
          page: pageNumber,
          limit: pageSize,
          hasNextPage: false,
          hasPreviousPage: false,
          totalPages: 0,
        },
      };
    }
  }

  // not used yet

  async getPopularAiTools(limit: number = 10) {
    try {
      const tools = await this.prisma.listedAiTool.findMany({
        where: {
          verified: true,
          popularityScore: { gte: 50 },
        },
        orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      });

      return {
        data: tools,
        error: null,
      };
    } catch (error) {
      console.error('Error getting popular AI tools:', error);
      return {
        data: [],
        error: {
          message: 'Failed to get popular AI tools',
          code: 'POPULAR_TOOLS_ERROR',
        },
      };
    }
  }

  async getFeaturedAiTools(limit: number = 10) {
    try {
      const tools = await this.prisma.listedAiTool.findMany({
        where: {
          featured: true,
          verified: true,
        },
        orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      });

      return {
        data: tools,
        error: null,
      };
    } catch (error) {
      console.error('Error getting featured AI tools:', error);
      return {
        data: [],
        error: {
          message: 'Failed to get featured AI tools',
          code: 'FEATURED_TOOLS_ERROR',
        },
      };
    }
  }

  async getAiToolsByDomain(domain: Domain, limit: number = 20) {
    try {
      const tools = await this.prisma.listedAiTool.findMany({
        where: {
          domains: { has: domain as any },
          verified: true,
        },
        orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      });

      return {
        data: tools,
        error: null,
      };
    } catch (error) {
      console.error('Error getting AI tools by domain:', error);
      return {
        data: [],
        error: {
          message: 'Failed to get AI tools by domain',
          code: 'DOMAIN_TOOLS_ERROR',
        },
      };
    }
  }
}
