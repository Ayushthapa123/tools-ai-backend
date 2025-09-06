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
    const isValidFilter =
      input.toolUserTypes.length > 0 ||
      input.pricingTypes.length > 0 ||
      input.aiTypes.length > 0 ||
      input.aiCapabilities.length > 0 ||
      input.modalities.length > 0 ||
      input.delivery.length > 0 ||
      input.domains.length > 0 ||
      input.platforms.length > 0 ||
      input.integrationOptions.length > 0 ||
      input.minPopularityScore != 0 ||
      input.maxPopularityScore != 100 ||
      input.featured ||
      input.verified ||
      input.startDate ||
      input.endDate;
    //  || input.researchMode;

    console.log('isValidFilter', isValidFilter, input.keywords);

    // Build where conditions for filtering
    const whereConditions: any = {};

    // If no valid filters are applied, search keywords in keywords and shortDescription fields
    if (!isValidFilter && input.keywords && input.keywords.length > 0) {
      const keywordSearchConditions = [];

      // Search each keyword in the keywords array and shortDescription
      for (const keyword of input.keywords) {
        keywordSearchConditions.push(
          // Search in the keywords array field
          { keywords: { has: keyword } },
          // Search in shortDescription field
          { shortDescription: { contains: keyword, mode: 'insensitive' } },
        );
      }

      whereConditions.OR = keywordSearchConditions;
    }

    // Apply filters only if isValidFilter is true
    if (isValidFilter) {
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
        whereConditions.publishedAt = {};
        if (input.startDate) {
          const startDate = new Date(input.startDate);
          if (!isNaN(startDate.getTime())) {
            whereConditions.publishedAt.gte = startDate;
          }
        }
        if (input.endDate) {
          const endDate = new Date(input.endDate);
          if (!isNaN(endDate.getTime())) {
            whereConditions.publishedAt.lte = endDate;
          }
        }
      }

      // Filter by research mode (this might need to be implemented based on your business logic)
      if (input.researchMode !== undefined) {
        // Add your research mode logic here
        // This could be based on a specific field or combination of fields
        // For now, I'll leave it as a placeholder
      }
    }

    // Build order by clause
    let orderBy: any = {};
    if (input.sortBy) {
      const sortField = input.sortBy as keyof ListedAiToolData;
      orderBy[sortField] = input.sortOrder || 'desc';
    } else {
      // Default sorting by popularity score and creation date
      orderBy = [{ popularityScore: 'desc' }];
    }

    try {
      // Get total count for pagination
      const totalCount = await this.prisma.listedAiTool.count({
        where: whereConditions,
      });

      // Get paginated results
      let tools = await this.prisma.listedAiTool.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
      });

      // If no results found and we have keywords, try searching in useCases and usps
      if (tools.length === 0 && input.keywords && input.keywords.length > 0) {
        try {
          // Build case-insensitive search using raw SQL
          const keywordConditions = input.keywords
            .map((keyword, index) => {
              const paramIndex = index + 1;
              return `(EXISTS (SELECT 1 FROM unnest("useCases") AS uc WHERE LOWER(uc) LIKE LOWER($${paramIndex})) OR 
                       EXISTS (SELECT 1 FROM unnest("usps") AS usp WHERE LOWER(usp) LIKE LOWER($${paramIndex})))`;
            })
            .join(' OR ');

          const countQuery = `SELECT COUNT(*) as count FROM "ListedAiTool" WHERE ${keywordConditions}`;
          const searchQuery = `
            SELECT * FROM "ListedAiTool" 
            WHERE ${keywordConditions}
            ORDER BY "popularityScore" DESC, "createdAt" DESC
            LIMIT $${input.keywords.length + 1} OFFSET $${input.keywords.length + 2}
          `;

          // Prepare parameters with wildcards for partial matching
          const searchParams = input.keywords.map((keyword) => `%${keyword}%`);
          const queryParams = [...searchParams, take, skip];

          // Get total count for fallback search
          const countResult = await this.prisma.$queryRawUnsafe(
            countQuery,
            ...searchParams,
          );
          const fallbackTotalCount = parseInt((countResult as any)[0].count);

          // Get paginated results from fallback search
          const rawResults = await this.prisma.$queryRawUnsafe(
            searchQuery,
            ...queryParams,
          );

          // Convert raw results back to the expected format
          tools = rawResults as any[];

          // Calculate pagination info for fallback search
          const totalPages = Math.ceil(fallbackTotalCount / pageSize);
          const hasNextPage = pageNumber < totalPages;
          const hasPreviousPage = pageNumber > 1;

          return {
            data: tools,
            error: null,
            pagination: {
              total: fallbackTotalCount,
              page: pageNumber,
              limit: pageSize,
              hasNextPage,
              hasPreviousPage,
              totalPages,
            },
          };
        } catch (sqlError) {
          console.error('Error in fallback search:', sqlError);
          // Fall back to the original Prisma approach if raw SQL fails
          const fallbackSearchConditions = [];
          for (const keyword of input.keywords) {
            fallbackSearchConditions.push(
              { useCases: { has: keyword } },
              { usps: { has: keyword } },
            );
          }

          const fallbackWhereConditions = {
            OR: fallbackSearchConditions,
          };

          const fallbackTotalCount = await this.prisma.listedAiTool.count({
            where: fallbackWhereConditions,
          });

          tools = await this.prisma.listedAiTool.findMany({
            where: fallbackWhereConditions,
            skip,
            take,
            orderBy,
          });

          const totalPages = Math.ceil(fallbackTotalCount / pageSize);
          const hasNextPage = pageNumber < totalPages;
          const hasPreviousPage = pageNumber > 1;

          return {
            data: tools,
            error: null,
            pagination: {
              total: fallbackTotalCount,
              page: pageNumber,
              limit: pageSize,
              hasNextPage,
              hasPreviousPage,
              totalPages,
            },
          };
        }
      }

      // Calculate pagination info for original search
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
