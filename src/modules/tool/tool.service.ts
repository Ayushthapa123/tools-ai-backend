import { UpdateToolInput } from './dtos/update-tool.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateToolInput } from './dtos/create-tool.input';
import { UserType } from '@src/models/global.enum';
import { CookieService } from '../auth/services/cookie.service';

@Injectable()
export class ToolService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cookieService: CookieService,
  ) {}

  async getAllTools(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.tool.findMany({
      skip,
      take,
      include: {
        inputSchema: true,
        outputSchema: true,
        toolMetadata: true,
        owner: true,
        // owner: true,
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getToolsByUserId(pageSize: number, pageNumber: number, userId: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.tool.findMany({
      where: {
        ownerId: userId,
      },
      skip,
      take,
      include: {
        inputSchema: true,
        outputSchema: true,
        toolMetadata: true,
        // owner: true,
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getToolById(toolId: number) {
    const tool = await this.prisma.tool.findUnique({
      where: { id: toolId },
    });
    return {
      data: tool,
      error: null,
    };
  }

  async getToolBySlug(slug: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { slug },
      include: {
        inputSchema: true,
        outputSchema: true,
        toolMetadata: true,
        // owner: true,
      },
    });

    return {
      data: tool,
      error: null,
    };
  }

  async getToolBytoken(toolId: number) {
    try {
      const tool = await this.prisma.tool.findFirst({
        where: { id: toolId },
      });
      return {
        data: tool,
        error: null,
      };
    } catch (error) {
      // Token verification failed
      return {
        data: null,
        error: {
          message: 'tool not found',
        },
      };
    }
  }

  async createTool(userId: number, data: CreateToolInput) {
    const slug = data.slug ?? generateSlug(data.name);

    try {
      const res = await this.prisma.tool.create({
        data: {
          ...data,
          slug: slug,
          handle: data.handle ?? slug,
          ownerId: userId,
          visibility: data.visibility,
        },
      });
      return {
        data: res,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }
  async createToolBySeedList(userId: number, data: CreateToolInput) {
    const slug = data.slug ?? generateSlug(data.name);

    try {
      const res = await this.prisma.tool.create({
        data: {
          ...data,
          slug: slug,
          handle: data.handle ?? slug,
          ownerId: userId,
          visibility: data.visibility,
        },
      });
      return {
        data: res,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async updateTool(toolId: number, data: UpdateToolInput) {
    const res = await this.prisma.tool.update({
      where: { id: toolId },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteTool(toolId: number) {
    const res = await this.prisma.tool.delete({
      where: { id: toolId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async verifyTool(toolId: number, userType: string, status: boolean) {
    if (userType === UserType.ADMIN) {
      const res = await this.prisma.tool.update({
        where: { id: toolId },
        data: {
          verifiedBySuperAdmin: status,
        },
      });
      console.log('calling verify hostel', res.id, status);
      if (res.id && status) {
        console.log('inside');
        // send email saying your hostle has been verified
      }
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }
}
