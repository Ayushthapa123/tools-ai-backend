import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateToken } from './dto/create-token.dto';
import { UpdateToken } from './dto/update-token.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createToken(createToken: CreateToken) {
    const token = await this.prisma.apiToken.create({
      data: {
        gemenaiToken: createToken.gemenaiToken,
        gptToken: createToken.gptToken,
        userId: createToken.userId,
      },
    });

    return {
      data: token,
      error: null,
    };
  }

  async getTokenById(id: number) {
    const token = await this.prisma.apiToken.findUnique({
      where: { id },
    });

    return {
      data: token,
      error: null,
    };
  }

  async getTokenByUserId(userId: number) {
    const token = await this.prisma.apiToken.findUnique({
      where: { userId },
    });

    return {
      data: token,
      error: null,
    };
  }

  async updateToken(updateToken: UpdateToken) {
    const { id } = updateToken;
    const token = await this.prisma.apiToken.update({
      where: { id },
      data: {
        gemenaiToken: updateToken.gemenaiToken,
        gptToken: updateToken.gptToken,
        userId: updateToken.userId,
      },
    });

    return {
      data: token,
      error: null,
    };
  }

  async removeToken(id: number) {
    const token = await this.prisma.apiToken.delete({
      where: { id },
    });

    return {
      data: token,
      error: null,
    };
  }
}
