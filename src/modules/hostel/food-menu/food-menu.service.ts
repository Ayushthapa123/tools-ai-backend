import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateFoodMenu } from './dtos/update-food-menu.dto';
import { CreateFoodMenu } from './dtos/create-food-menu.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class FoodMenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFoodMenus() {
    return this.prismaService.foodMenu.findMany();
  }

  async getFoodMenuById(id: number) {
    return this.prismaService.foodMenu.findUnique({
      where: {
        foodMenuId: id,
      },
    });
  }

  async getFoodMenuByHostelId(hostelId: number) {
    return this.prismaService.foodMenu.findMany({
      where: {
        hostelId,
      },
    });
  }
  async createMenu(data: CreateFoodMenu) {
    return this.prismaService.foodMenu.create({
      data,
    });
  }

  async updateMenu(
    foodMenuId: number,
    updatedData: UpdateFoodMenu,
    accessToken: string,
  ) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const decodeUserId = decoded.sub;
    const user = await this.prismaService.users.findUnique({
      where: {
        userId: Number(decodeUserId),
      },
    }); // this gives us the loggedin user
    if (!user) {
      throw new NotFoundException('User with this id not found');
    }
    const selectedHostel = await this.prismaService.hostel.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        foodMenu: true,
      },
    }); // this gives us the hostel of the logged in user
    if(!selectedHostel){
        throw new NotFoundException("The user hasn't registered any hostel on his name.")
    }
    const selectedMenu = await this.prismaService.foodMenu.findFirst({
      where: {
        foodMenuId,
      },
    }); // this gives us the hostel in which this menu is mentioned.
    if (selectedMenu.hostelId !== selectedHostel.hostelId) {
      throw new NotFoundException('You are not the owner. you cannot update the menu.');
    }
    return this.prismaService.foodMenu.update({
      where: {
        foodMenuId,
      },
      data: updatedData,
    });
  }

  async deleteMenu(id: number,accessToken:string) {

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const decodeUserId = decoded.sub;
    const user = await this.prismaService.users.findUnique({
      where: {
        userId: Number(decodeUserId),
      },
    }); // this gives us the loggedin user
    if (!user) {
      throw new NotFoundException('user with this id not found');
    }
    const selectedHostel = await this.prismaService.hostel.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        foodMenu: true,
      },
    }); // this gives us the hostel of the logged in user
    if(!selectedHostel){
        throw new NotFoundException("The user hasn't registered any hostel on his name.")
    }
    const selectedMenu = await this.prismaService.foodMenu.findFirst({
      where: {
        foodMenuId:id,
      },
    }); // this gives us the hostel in which this menu is mentioned.
    if (selectedMenu.hostelId !== selectedHostel.hostelId) {
      throw new NotFoundException('You are not the owner. you cannot delete the menu.');
    }

    await this.prismaService.foodMenu.delete({
      where: {
        foodMenuId: id,
      },
    });
    return this.prismaService.foodMenu.findMany({
        where:{
            hostelId:selectedHostel.hostelId,
        }
    });
  }
}
