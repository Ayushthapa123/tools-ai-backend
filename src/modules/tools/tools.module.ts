import { Module } from '@nestjs/common';
import { TbcModule } from './travel-budget-calculator/tbc.module';
import { TdfModule } from './travel-destination-finder/tdf.module';
import { TcgModule } from './travel-checklist-generator/tcg.module';
@Module({
  imports: [TbcModule, TdfModule, TcgModule],
})
export class ToolsModule {}
