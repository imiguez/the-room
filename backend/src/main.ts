import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as session from 'express-session';
import * as passport from 'passport';
import * as mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import RedisStore from 'connect-redis';
import { ExpressSessionUser } from './auth/types/user-express-session.type';

declare module 'express-session' {
  interface SessionData {
    passport?: {
      user?: ExpressSessionUser;
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appPort = configService.get('port');
  const { host, port } = configService.get('redis');

  // Initialize client.
  const redisClient = createClient({
    url: `redis://${host}:${port}`,
  });
  redisClient.connect().catch(console.error);

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  });

  app.setGlobalPrefix('api');

  // MIDDLEWARES.
  app.useGlobalPipes(new ValidationPipe());
  // Secure HTTP Headers.
  app.use(helmet());
  // Sanitize incoming requests by preventing NoSQL Injections.
  app.use(mongoSanitize());
  // Initialize session storage.
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret:
        configService.get<string>('expressSession.secret') || 'default_secret',
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'prod',
        maxAge:
          process.env.NODE_ENV == 'prod' ? 1000 * 60 * 60 * 24 : 1000 * 60,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(appPort);

  console.log(
    `Server running in ${process.env.NODE_ENV} environment on port ${appPort}!`,
  );
}
bootstrap();
