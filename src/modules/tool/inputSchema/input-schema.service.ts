import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInputSchemaDto } from './dto/create-input-schema.dto';
import { UpdateInputSchemaDto } from './dto/update-input-schema.dto';

@Injectable()
export class InputSchemaService {
  constructor(private prisma: PrismaService) {}

  async createInputSchema(createInputSchemaDto: CreateInputSchemaDto) {
    const inputSchema = await this.prisma.inputSchema.create({
      data: {
        ...createInputSchemaDto,
      },
    });

    return {
      data: inputSchema,
      error: null,
    };
  }

  async findByToolId(toolId: number) {
    const inputSchema = await this.prisma.inputSchema.findUnique({
      where: { toolId },
    });

    return {
      data: inputSchema,
      error: null,
    };
  }

  async updateInputSchema(updateInputSchemaDto: UpdateInputSchemaDto) {
    const { id, ...data } = updateInputSchemaDto;
    const inputSchema = await this.prisma.inputSchema.update({
      where: { id },
      data,
    });

    return {
      data: inputSchema,
      error: null,
    };
  }

  async removeInputSchema(id: number) {
    const inputSchema = await this.prisma.inputSchema.delete({
      where: { id },
    });

    return {
      data: inputSchema,
      error: null,
    };
  }
}
