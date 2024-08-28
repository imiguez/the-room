import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { ExpressSessionSerializer } from './serializer';
import { ExpressSessionAuthGuard } from './guards/express-session.guard';
import { APP_GUARD } from '@nestjs/core';

// The user Model is imported because usersService from AuthService uses it.
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    UsersService,
    GoogleStrategy,
    ExpressSessionSerializer,
    {
      provide: APP_GUARD,
      useClass: ExpressSessionAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
