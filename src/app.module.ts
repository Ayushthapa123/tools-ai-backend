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
import { SearchSuggestionsModule } from './modules/search/searchSuggestions/searchSuggestions.module';
import { ImageModule } from './modules/image/image.module';
import { MailersendModule } from './modules/mailersend/mailersend.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { SearchQueriesModule } from './modules/hostel/searchQueries/search-queries.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module';
import { BlogPostModule } from './modules/blogPost/blogPost.module';
import { HostelSearchFormModule } from './modules/HostelSearchForm/hostelSearchForm.module';
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
    HostelModule,
    SearchQueriesModule,
    SearchModule,
    SearchSuggestionsModule,
    ImageModule,
    MailersendModule,
    SuperadminModule,
    BlogPostModule,
    HostelSearchFormModule,
  ],

  controllers: [AppController], //we don't need it now
  providers: [AppService, JwtService],
})
export class AppModule {}
