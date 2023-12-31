import { AuthAdapter } from './auth/auth.adapter';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { nestCsrf, CsrfFilter } from 'ncsrf';
import * as process from 'process';

import * as cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import fastifyCsrfProtection from '@fastify/csrf-protection';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
  });
  app.use('/public', express.static('public'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.useGlobalFilters(new CsrfFilter());
  app.use(nestCsrf());
  app.useWebSocketAdapter(new AuthAdapter(app));
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.session());

  await app.listen(4000);
}

bootstrap();
