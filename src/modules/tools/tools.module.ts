import { Module } from '@nestjs/common';
import { TbcModule } from './travel-budget-calculator/tbc.module';
import { TdfModule } from './travel-destination-finder/tdf.module';
import { TcgModule } from './travel-checklist-generator/tcg.module';
import { CagModule } from './customer-avatar-generator/cag.module';
@Module({
  imports: [TbcModule, TdfModule, TcgModule, CagModule],
})
export class ToolsModule {}
