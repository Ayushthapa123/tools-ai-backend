import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
// import { EmailModule } from './email/email.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { ImageController } from './modules/image/image.controller';
import { SearchModule } from './modules/search/search.module';
// import { ImageModule } from './image/image.module';
// import { ImageModule } from './image/image.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //It is schema first approach
      sortSchema: true,
    }),
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
