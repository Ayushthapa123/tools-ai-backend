import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { UsersResolver } from './users/users.resolver';
// import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //It is schema first approach
      sortSchema: true,
    }),
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, UsersResolver],
})
export class AppModule {}
