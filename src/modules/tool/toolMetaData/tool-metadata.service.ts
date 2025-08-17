import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateToolMetaDataDto } from './dto/create-tool-metadata.dto';
import { UpdateToolMetaDataDto } from './dto/update-tool-metadata.dto';

@Injectable()
export class ToolMetaDataService {
  constructor(private prisma: PrismaService) {}

  async createToolMetaData(createToolMetaDataDto: CreateToolMetaDataDto) {
    const toolMetaData = await this.prisma.toolMetadata.create({
      data: {
        ...createToolMetaDataDto,
      },
    });

    return {
      data: toolMetaData,
      error: null,
    };
  }

  async findToolMetaDataByToolId(toolId: number) {
    const toolMetaData = await this.prisma.toolMetadata.findUnique({
      where: { toolId },
    });

    return {
      data: toolMetaData,
      error: null,
    };
  }
  async findToolMetaDataById(id: number) {
    const toolMetaData = await this.prisma.toolMetadata.findUnique({
      where: { id },
    });

    return {
      data: toolMetaData,
      error: null,
    };
  }

  async updateToolMetaData(updateToolMetaDataDto: UpdateToolMetaDataDto) {
    const { id, ...data } = updateToolMetaDataDto;
    const toolMetaData = await this.prisma.toolMetadata.update({
      where: { id },
      data,
    });

    return {
      data: toolMetaData,
      error: null,
    };
  }

  async removeToolMetaData(id: number) {
    const toolMetaData = await this.prisma.toolMetadata.delete({
      where: { id },
    });

    return {
      data: toolMetaData,
      error: null,
    };
  }
}
