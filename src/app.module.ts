import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { JwtService } from '@nestjs/jwt'; //remove this
import { SearchModule } from './modules/search/search.module';
import { ImageModule } from './modules/image/image.module';
import { MailersendModule } from './modules/mailersend/mailersend.module';

import { ToolsModule } from './modules/tools/tools.module';
import { ToolModule } from './modules/tool/tool.module';
import { ListedAiToolModule } from './modules/listedAiTool/listed-ai-tool.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //It is schema first approach
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      playground: process.env.NODE_ENV === 'development',
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    SearchModule,
    ImageModule,
    MailersendModule,

    ToolsModule,
    ToolModule,
    ListedAiToolModule,
  ],

  controllers: [AppController], //we don't need it now
  providers: [AppService, JwtService],
})
export class AppModule {}
