import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
// import { execSync } from 'child_process';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  // // Check if migrations need to be applied
  // const pendingMigrationsOutput = execSync(
  //   'npx prisma migrate dev --name dummy',
  //   { encoding: 'utf-8' },
  // );
  // const pendingMigrations = /No pending migrations/g.test(
  //   pendingMigrationsOutput,
  // );

  // if (!pendingMigrations) {
  //   // Apply pending migrations
  //   execSync('npx prisma migrate deploy');
  // }
  await app.listen(3001);
}
bootstrap();
