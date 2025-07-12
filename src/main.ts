import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  dotenv.config();
  console.log(process.env.WEB_URL);

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        process.env.WEB_URL!,
        process.env.WEB_URL_1!,
        process.env.WEB_URL_2!,
        process.env.WEB_URL_3!,
        process.env.WEB_URL_4!,
        process.env.WEB_URL_5!,
      ],
      // Specify exact origin
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Set-Cookie'],
      maxAge: 3600, // 1 hour CACHE TIME FOR CORS
    },
  });

  // Enable cookie parsing with secret
  app.use(cookieParser());

  app.useGlobalGuards();
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  await app.listen(process.env.PORT || 3003);
}
bootstrap();
