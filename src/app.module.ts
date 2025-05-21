import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { SearchModule } from './modules/search/search.module';
import { ImageController } from './modules/image/image.controller';
import { SHostelModule } from './modules/shostel/s-hostels.module';
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// import { HostelRulesModule } from './modules/hostel/hostelRules/hostelRules.module';
import { SearchQueriesModule } from './modules/searchQueries/search-queries.module';
import { JwtService } from '@nestjs/jwt'; //remove this
// import { APP_GUARD } from '@nestjs/core';
// import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //It is schema first approach
      sortSchema: true,
      // playground:false
    }),

    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       ttl: 6000,
    //       limit: 100,
    //     },
    //   ],
    // }),

    PrismaModule,

    AuthModule,
    UsersModule,
    EmailModule,
    HostelModule,
    SearchModule,
    SHostelModule,
    SearchQueriesModule,
    // ImageModule,
  ],

  controllers: [AppController, ImageController], //we don't need it now
  providers: [
    AppService,
    JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ], //we dont need it now
})
export class AppModule {}
