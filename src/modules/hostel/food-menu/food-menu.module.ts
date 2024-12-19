import { Module } from '@nestjs/common';
import { FoodMenuResolver } from './food-menu.resolver';
import { FoodMenuService } from './food-menu.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FoodMenuResolver, FoodMenuService,JwtService],
})
export class FoodMenuModule {}
