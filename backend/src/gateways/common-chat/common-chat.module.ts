import { Module } from '@nestjs/common';
import { CommonChatGateway } from './common-chat.gateway';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  providers: [CommonChatGateway, MessagesService],
})
export class CommonChatModule {}
