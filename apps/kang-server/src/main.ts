import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('hello');

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(
      'Listening at http://localhost:' + process.env.PORT + '/' + globalPrefix,
    );
  });
}
bootstrap();
