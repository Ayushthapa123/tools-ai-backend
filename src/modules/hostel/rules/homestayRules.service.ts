import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRulesInput } from './dtos/create-rules.input';
import { UpdateRulesInput } from './dtos/update-rules.input';

@Injectable()
export class HomestayRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async getRulesById(rulesId: number) {
    const rules = await this.prisma.homestayRules.findUnique({
      where: { id: rulesId },
    });
    return {
      data: rules,
      error: null,
    };
  }

  async getRulesByHomestayId(homestayId: number) {
    const rules = await this.prisma.homestayRules.findUnique({
      where: { homestayId },
    });
    return {
      data: rules,
      error: null,
    };
  }

  async createRules(data: CreateRulesInput) {
    const rules = await this.prisma.homestayRules.create({
      data,
    });
    return {
      data: rules,
      error: null,
    };
  }

  async updateRules(rulesId: number, data: UpdateRulesInput) {
    const rules = await this.prisma.homestayRules.update({
      where: { id: rulesId },
      data,
    });
    return {
      data: rules,
      error: null,
    };
  }

  async deleteRules(rulesId: number) {
    const rules = await this.prisma.homestayRules.delete({
      where: { id: rulesId },
    });
    return {
      data: rules,
      error: null,
    };
  }
}
