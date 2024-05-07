import { Socials } from '../../../models/global.model';
import { UpdateSocialsInput } from './dtos/update-socials.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateSocialsInput } from './dtos/create-socials.input';

@Injectable()
export class SocialsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSocialsByHostelId(hostelId: number): Promise<Socials | null> {
    return this.prisma.socials.findUnique({
      where: { hostelId },
    });
  }

  async createSocials(data: CreateSocialsInput) {
    return this.prisma.socials.create({ data });
  }

  async updateSocials(socialsId: number, data: UpdateSocialsInput) {
    return this.prisma.socials.update({ where: { socialsId }, data });
  }

  async deleteSocials(socialsId: number) {
    return this.prisma.socials.delete({ where: { socialsId } });
  }
}
