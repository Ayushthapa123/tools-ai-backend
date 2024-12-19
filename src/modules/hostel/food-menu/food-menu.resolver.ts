import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodMenuService } from './food-menu.service';
import { FoodMenu } from '@src/models/global.model';
import { CreateFoodMenu } from './dtos/create-food-menu.dto';
import { UpdateFoodMenu } from './dtos/update-food-menu.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

@Resolver()
export class FoodMenuResolver {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  @Query(() => [FoodMenu])
  async getFoodMenus() {
    return this.foodMenuService.getAllFoodMenus();
  }

  @Query(() => [FoodMenu])
  async getFoodMenuByHostelId(@Args('hostelId') hostelId: number) {
    return this.foodMenuService.getFoodMenuByHostelId(hostelId);
  }

  @Mutation(() => FoodMenu)
  @UseGuards(AuthGuard)
  async createMenu(@Args('data') data: CreateFoodMenu, @Context() ctx: any) {
    const decodeUserId = ctx?.user?.sub;
    return this.foodMenuService.createMenu(data, decodeUserId);
  }

  @Mutation(() => FoodMenu)
  @UseGuards(AuthGuard)
  async updateMenu(
    @Args('updatedData') updatedData: UpdateFoodMenu,
    @Args('foodMenuId') foodMenuId: number,
    @Context() ctx: any,
  ) {
    const decodeUserId = ctx?.user?.sub;
    return this.foodMenuService.updateMenu(
      decodeUserId,
      foodMenuId,
      updatedData,
    );
  }

  @Mutation(() => [FoodMenu])
  @UseGuards(AuthGuard)
  async deleteMenu(@Args('menuId') menuId: number, @Context() ctx: any) {
    const decodeUserId = ctx?.user?.sub;
    return this.foodMenuService.deleteMenu(menuId, decodeUserId);
  }

  //Deleting by id and deleteMenu are doing the same task
  // @Mutation(() => [FoodMenu])
  // @UseGuards(AuthGuard)
  // async deleteFoodMenuById(
  //   @Args('foodMenuId') foodMenuId: number,
  //   @Context() ctx: any,
  // ) {
  //   const decodeUserId = ctx?.user?.sub;
  //   return this.foodMenuService.deleteFoodMenuById(foodMenuId, decodeUserId);
  // }
}
