import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import envConfigs from './env.configs';
import { PassportModule } from '@nestjs/passport';
import { MessagesModule } from './messages/messages.module';
import { CommonChatModule } from './gateways/common-chat/common-chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfigs],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
    }),
    PassportModule.register({ session: true }),
    UsersModule,
    AuthModule,
    MessagesModule,
    CommonChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
