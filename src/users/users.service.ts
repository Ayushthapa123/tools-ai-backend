// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateUserInput } from './create-user.dto';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.users.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }

    return user;
  }

  async createUser(input: CreateUserInput) {
    return this.prismaService.users.create({
      data: input,
    });
  }

  async getUserByToken(accessToken: string) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decoded.sub;
    const user = await this.prismaService.users.findUnique({
      where: { userId: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException(`User with this ID  not found`);
    }

    return user;
  }

  async createUsers(inputs: CreateUserInput[]) {
    return this.prismaService.users.createMany({
      data: inputs,
    });
  }
}
