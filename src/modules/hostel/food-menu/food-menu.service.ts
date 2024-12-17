import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateFoodMenu } from './dtos/update-food-menu.dto';
import { CreateFoodMenu } from './dtos/create-food-menu.dto';

@Injectable()
export class FoodMenuService {
    constructor(private readonly prismaService:PrismaService){}

    async getAllFoodMenus(){
        return this.prismaService.foodMenu.findMany();
    }

    async getFoodMenuById(id:number){
        return this.prismaService.foodMenu.findUnique({
            where:{
                foodMenuId:id
            }
        })
    }

    async createMenu(data:CreateFoodMenu){
        return this.prismaService.foodMenu.create({
            data
        })
    }

    async updateMenu(id:number,updatedData:UpdateFoodMenu){
        return this.prismaService.foodMenu.update({
            where:{
                foodMenuId:id,
            },
            data:updatedData,
        })
    }

    async deleteMenu(id:number){
        return this.prismaService.foodMenu.delete({
            where:{
                foodMenuId:id,
            }
        })
    }
}
