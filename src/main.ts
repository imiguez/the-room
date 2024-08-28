import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as session from 'express-session';
import * as passport from 'passport';
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

  const appPort = configService.get('port');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // Initialize session storage.
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret:
        configService.get<string>('expressSession.secret') || 'default_secret',
      cookie: {
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
