import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make PrismaService available for injection in other modules
})
export class DatabaseModule {}
