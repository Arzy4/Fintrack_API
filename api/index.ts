import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  }

  return app;
}

export default async function handler(req, res) {
  const app = await bootstrap();

  const instance = app.getHttpAdapter().getInstance();

  return instance(req, res);
}