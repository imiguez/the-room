import { Module } from '@nestjs/common';
import { CommonChatGateway } from './common-chat.gateway';
import { MessagesService } from 'src/messages/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/messages/schema/message.schema';
import { ExpressSessionAuthGuard } from 'src/auth/guards/express-session.guard';

// The Message Model is imported because messagesService from the gateway uses it.
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [CommonChatGateway, MessagesService, ExpressSessionAuthGuard],
})
export class CommonChatModule {}
