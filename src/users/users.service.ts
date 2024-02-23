// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateUserInput } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.users.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { id },
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

  async createUsers(inputs: CreateUserInput[]) {
    return this.prismaService.users.createMany({
      data: inputs,
    });
  }
}
