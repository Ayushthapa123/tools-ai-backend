import { UpdateListedAiToolInput } from './dtos/update-listed-ai-tool.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListedAiToolInput } from './dtos/create-listed-ai-tool.input';
import { UserType } from '@src/models/global.enum';
import { CookieService } from '../auth/services/cookie.service';

@Injectable()
export class ListedAiToolService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cookieService: CookieService,
  ) {}

  async getAllListedAiTools(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByUserId(
    pageSize: number,
    pageNumber: number,
    userId: number,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      where: {
        ownerId: userId,
      },
      skip,
      take,
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolById(toolId: number) {
    const tool = await this.prisma.tool.findUnique({
      where: { id: toolId },
    });
    return {
      data: tool,
      error: null,
    };
  }

  async getListedAiToolBytoken(toolId: number) {
    try {
      const tool = await this.prisma.listedAiTool.findFirst({
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

  async createListedAiTool(userId: number, data: CreateListedAiToolInput) {
    try {
      const res = await this.prisma.listedAiTool.create({
        data: {
          ...data,
          ownerId: userId,
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

  async updateListedAiTool(toolId: number, data: UpdateListedAiToolInput) {
    const res = await this.prisma.listedAiTool.update({
      where: { id: toolId },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteListedAiTool(toolId: number) {
    const res = await this.prisma.listedAiTool.delete({
      where: { id: toolId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async verifyListedAiTool(toolId: number, userType: string, status: boolean) {
    if (userType === UserType.ADMIN) {
      const res = await this.prisma.listedAiTool.update({
        where: { id: toolId },
        data: {
          verified: status,
        },
      });
      console.log('calling verify listed ai tool', res.id, status);
      if (res.id && status) {
        console.log('inside');
        // send email saying your listed ai tool has been verified
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
