import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInputSchema } from './dto/create-input-schema.dto';
import { UpdateInputSchema } from './dto/update-input-schema.dto';

@Injectable()
export class InputSchemaService {
  constructor(private prisma: PrismaService) {}

  async createInputSchema(createInputSchema: CreateInputSchema) {
    const inputSchema = await this.prisma.inputSchema.create({
      data: {
        ...createInputSchema,
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

  async updateInputSchema(updateInputSchema: UpdateInputSchema) {
    const { id, ...data } = updateInputSchema;
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
