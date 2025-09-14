// users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateUserInput } from './create-user.dto';
import { UpdateUserInput } from './dtos/update-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const res = await this.prismaService.user.findMany();
    return {
      data: res,
      error: null,
    };
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return {
        data: null,
        error: {
          message: `User with ID ${id} not found`,
        },
      };
    }

    return {
      data: user,
      error: null,
    };
  }

  async getUserByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      include: {
        tool: true,
      },
    });

    if (!user) {
      return {
        data: null,
        error: {
          message: `User with Username ${username} not found`,
        },
      };
    }

    return {
      data: user,
      error: null,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        data: null,
        error: {
          message: `User with Email ${email} not found`,
        },
      };
    }

    return {
      data: user,
      error: null,
    };
  }

  async createUser(input: CreateUserInput) {
    const res = await this.prismaService.user.create({
      data: input,
    });
    return {
      data: res,
      error: null,
    };
  }

  async updateUser(input: UpdateUserInput) {
    const { id, ...data } = input;
    const res = await this.prismaService.user.update({
      where: { id },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async getUserByToken(accessToken: string) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decoded.sub;
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return {
        data: null,
        error: {
          message: `User with this ID  not found`,
        },
      };
    }

    return {
      data: user,
      error: null,
    };
  }

  async createUsers(inputs: CreateUserInput[]) {
    const res = await this.prismaService.user.createMany({
      data: inputs,
    });
    return {
      data: res,
      error: null,
    };
  }
}
