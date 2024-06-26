import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configs } from './config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  const corsOption = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['set-cookie', 'Set-Cookie'],
  };

  app.enableCors(corsOption);
  const config = new DocumentBuilder()
    .setTitle('Auth_api')
    .setDescription('The Pern authentication api ')
    .setVersion('1.0')
    .addTag('auth_api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);
  await app.listen(configs.port.http_port);
  Logger.log(`app running on port ${configs.port.http_port}`);
}
bootstrap();
