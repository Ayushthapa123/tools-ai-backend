import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalGuards();

  await app.listen(process.env.PORT || 3003);
}
bootstrap();
