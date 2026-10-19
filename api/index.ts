import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { setupSwagger } from '../src/swagger.config';
import express from 'express';

const server = express();

let appPromise: Promise<void> | undefined;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app);

  await app.init();
}

export default async function handler(req: any, res: any) {
  if (!appPromise) {
    appPromise = bootstrap().catch((error) => {
      appPromise = undefined;
      throw error;
    });
  }

  await appPromise;

  return server(req, res);
}