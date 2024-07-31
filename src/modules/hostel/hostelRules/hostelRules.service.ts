import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHostelRulesInput } from './dtos/create-hostelRules.input';
import { UpdateHostelRulesInput } from './dtos/update-hostelRules.input';
import { HostelRules } from '@src/models/global.model';

@Injectable()
export class HostelRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async getHostelRulesById(rulesId: number): Promise<HostelRules | null> {
    return this.prisma.hostelRules.findUnique({
      where: { rulesId },
    });
  }

  async getHostelRulesByHostelId(hostelId: number): Promise<HostelRules | null> {
    return this.prisma.hostelRules.findUnique({
      where: { hostelId },
    });
  }

  async createHostelRules(data: CreateHostelRulesInput): Promise<HostelRules> {
    return this.prisma.hostelRules.create({
      data,
    });
  }

  async updateHostelRules(rulesId: number, data: UpdateHostelRulesInput): Promise<HostelRules> {
    return this.prisma.hostelRules.update({
      where: { rulesId },
      data,
    });
  }

  async deleteHostelRules(rulesId: number): Promise<HostelRules> {
    return this.prisma.hostelRules.delete({
      where: { rulesId },
    });
  }
}
