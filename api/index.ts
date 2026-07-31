import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import serverless from 'serverless-http';
import { ValidationPipe } from '@nestjs/common';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

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

let handler: any;

export default async function (req: any, res: any) {
  if (!handler) {
    await bootstrap();
    handler = serverless(expressApp);
  }

  return handler(req, res);
}