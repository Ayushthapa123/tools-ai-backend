import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
// import { EmailModule } from './email/email.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { SearchModule } from './modules/search/search.module';
import { ImageController } from './modules/image/image.controller';
// import { ImageModule } from './image/image.module';
// import { ImageModule } from './image/image.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //It is schema first approach
      sortSchema: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    // EmailModule,
    HostelModule,
    SearchModule,
    // ImageModule,
  ],

  controllers: [AppController, ImageController], //we don't need it now
  providers: [AppService], //we dont need it now
})
export class AppModule {}
