import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { nestCsrf, CsrfFilter } from 'ncsrf';
import * as process from 'process';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
  });
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.useGlobalFilters(new CsrfFilter());
  app.use(nestCsrf());
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
