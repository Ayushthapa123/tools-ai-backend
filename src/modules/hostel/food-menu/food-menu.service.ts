import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateFoodMenu } from './dtos/update-food-menu.dto';
import { CreateFoodMenu } from './dtos/create-food-menu.dto';
import { GraphQLError } from 'graphql';
@Injectable()
export class FoodMenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFoodMenus() {
    return this.prismaService.foodMenu.findMany();
  }

  
  async getFoodMenuByHostelId(hostelId: number) {
    return this.prismaService.foodMenu.findMany({
      where: {
        hostelId,
      },
    });
  }
  async createMenu(data: CreateFoodMenu,ctx:any) {
    const {selectedHostel} = await this.validateToCreateMenu(ctx,data);
    //this returns the hostel of the loggedin user if he has a hostel.
    return this.prismaService.foodMenu.create({
      // data,
      //should ask hostel id from mutation? or follow down method?
      data:{
        ...data,
        hostelId:selectedHostel.hostelId,
      }      
    });
  }

  async updateMenu(
    ctx:any,
    foodMenuId: number,
    updatedData: UpdateFoodMenu,
  ) {
    const {selectedHostel,selectedMenu} = await this.validationForUpdateAndDelete(ctx,foodMenuId);
    if (selectedMenu.hostelId !== selectedHostel.hostelId) {
      throw new GraphQLError(
        'You are not the owner. you cannot update the menu.',
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        },
      );
    }

    return this.prismaService.foodMenu.update({
      where: {
        foodMenuId,
      },
      data: updatedData,
    });
  }
  
  async deleteMenu(foodMenuId: number, ctx: any) {
    
   const {selectedHostel,selectedMenu} = await this.validationForUpdateAndDelete(ctx,foodMenuId);

    if (selectedMenu.hostelId !== selectedHostel.hostelId) {
      throw new GraphQLError(
        'You are not the owner. you cannot delete the menu.',
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        },
      );
    }

    await this.prismaService.foodMenu.delete({
      where: {
        foodMenuId,
      },
    });
    return this.prismaService.foodMenu.findMany({
      where: {
        hostelId: selectedHostel.hostelId,
      },
    });
  }

  async deleteFoodMenuById(foodMenuId: number,ctx:any) {
    const {selectedHostel,selectedMenu} = await this.validationForUpdateAndDelete(ctx,foodMenuId);
    await this.prismaService.foodMenu.delete({
      where: {
        foodMenuId:selectedMenu.foodMenuId,
        hostelId:selectedMenu.hostelId,
      },
    });
    return this.prismaService.foodMenu.findMany({
      where:{
        hostelId:selectedHostel.hostelId,
      }
    })
  }
  private async validationForUpdateAndDelete(ctx:any,foodMenuId:number){
    const  decodeUserId = ctx?.userId;
    if(!decodeUserId){
        throw new GraphQLError('Invalid or expired access token.', {
          extensions: { 
            code: 'UNAUTHENTICATED' 
          },
      })
    }
    const user = await this.prismaService.users.findUnique({
      where: {
        userId: Number(decodeUserId),
        userType: 'HOSTEL_OWNER', //hostel owner is not added student by default
      },
    }); // this gives us the loggedin user
    console.log("user tyoe",user); // user hostelid is not generated automatically see in schema
    if (!user) {
      throw new GraphQLError('Only user owning hostel can update/delete this menu.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const selectedHostel = await this.prismaService.hostel.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        foodMenu: true,
      },
    }); // this gives us the hostel of the logged in user
    if (!selectedHostel) {
      throw new GraphQLError(
        "The user hasn't registered any hostel on his name.",
        {
          extensions: {
            code: 'NOT_FOUND',
          },
        },
      );
    }
    const selectedMenu = await this.prismaService.foodMenu.findFirst({
      where: {
        foodMenuId,
        hostelId:user?.hostelId, 
      },
    }); // this gives us the hostel in which this menu is mentioned.

    if (!selectedMenu) {
      throw new GraphQLError(`Only owner of this hostel can update/delete a menu. `, {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }
    return {selectedHostel,selectedMenu};
  }

  private async validateToCreateMenu(ctx:any,data:CreateFoodMenu){
      const  decodeUserId = ctx?.userId;
      console.log("hello",decodeUserId);
        if(!decodeUserId){
          throw new GraphQLError('Invalid or expired access token.', {
            extensions: { 
              code: 'UNAUTHENTICATED' 
            },
        })
      }
      const user = await this.prismaService.users.findUnique({
        where: {
          userId: Number(decodeUserId),
          userType: 'HOSTEL_OWNER',
        },
      }); // this gives us the loggedin user
      console.log("user is",user); 
      if (!user) {
        throw new GraphQLError('Only hostel owner can create a menu.', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }
      const selectedHostel = await this.prismaService.hostel.findUnique({
        where: {
          userId: user.userId,
        }
      }); // this gives us the hostel of the logged in user
      if (!selectedHostel) {
        throw new GraphQLError(
          "The user hasn't registered any hostel on his name.So,he can't create menu.",
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          },
        );
      }
if(selectedHostel.hostelId !== data.hostelId){//should i display the original hostel name?
  throw new GraphQLError(`Only owner of this hostel can create a menu. `,{
    extensions:{
      code:"FORBIDDEN"
    }
  })
}
    const existingMenu = await this.prismaService.foodMenu.findFirst({
      where:{
        day:data.day,
        hostelId:data.hostelId,
      }
    })
    if(existingMenu){
      throw new GraphQLError(`Menu already exists for ${data.day}. Please consider updating.`,{
        extensions:{
          code:'CONFLICT',
        }
      })
    }
  return {selectedHostel};
  }
}
