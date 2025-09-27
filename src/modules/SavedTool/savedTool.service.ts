import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSavedTool } from './dto/create-saved-tool.dto';
import { UpdateSavedTool } from './dto/update-saved-tool.dto';

@Injectable()
export class SavedToolService {
  constructor(private prisma: PrismaService) {}

  async createSavedTool(createSavedTool: CreateSavedTool) {
    const savedTool = await this.prisma.savedTool.create({
      data: {
        toolId: createSavedTool.toolId,
        userId: createSavedTool.userId,
      },
    });

    return {
      data: savedTool,
      error: null,
    };
  }

  async getSavedToolById(id: number) {
    const savedTool = await this.prisma.savedTool.findUnique({
      where: { id },
    });

    return {
      data: savedTool,
      error: null,
    };
  }

  async getSavedToolsByToolId(toolId: number) {
    const savedTools = await this.prisma.savedTool.findMany({
      where: { toolId },
    });

    return {
      data: savedTools,
      error: null,
    };
  }
  async getSavedToolsByUserId(userId: number) {
    const savedTools = await this.prisma.savedTool.findMany({
      where: { userId },
      include: {
        tool: true,
        user: true,
      },
    });
    console.log('savedTools', userId, savedTools);

    return {
      data: savedTools,
      error: null,
    };
  }

  async updateSavedTool(updateSavedTool: UpdateSavedTool) {
    const { id } = updateSavedTool;
    const savedTool = await this.prisma.savedTool.update({
      where: { id },
      data: {
        toolId: updateSavedTool.toolId,
        userId: updateSavedTool.userId,
      },
    });

    return {
      data: savedTool,
      error: null,
    };
  }

  async removeSavedTool(id: number) {
    const savedTool = await this.prisma.savedTool.delete({
      where: { id },
    });

    return {
      data: savedTool,
      error: null,
    };
  }
}
