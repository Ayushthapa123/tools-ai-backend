import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRulesInput } from './dtos/create-rules.input';
import { UpdateRulesInput } from './dtos/update-rules.input';

@Injectable()
export class HostelRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async getRulesById(rulesId: number) {
    const rules = await this.prisma.hostelRules.findUnique({
      where: { id: rulesId },
    });
    return {
      data: rules,
      error: null,
    };
  }

  async getRulesByHostelId(hostelId: number) {
    const rules = await this.prisma.hostelRules.findUnique({
      where: { hostelId },
    });
    return {
      data: rules,
      error: null,
    };
  }

  async createRules(data: CreateRulesInput) {
    const rules = await this.prisma.hostelRules.create({
      data,
    });
    return {
      data: rules,
      error: null,
    };
  }

  async updateRules(rulesId: number, data: UpdateRulesInput) {
    const rules = await this.prisma.hostelRules.update({
      where: { id: rulesId },
      data,
    });
    return {
      data: rules,
      error: null,
    };
  }

  async deleteRules(rulesId: number) {
    const rules = await this.prisma.hostelRules.delete({
      where: { id: rulesId },
    });
    return {
      data: rules,
      error: null,
    };
  }
}
