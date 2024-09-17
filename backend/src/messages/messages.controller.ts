import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './schema/message.schema';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(MessagesService) private messagesService: MessagesService,
  ) {}

  @Post()
  async createMessage(@Body() message: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(message);
  }

  @Get('?')
  async loadMoreMessages(
    @Query('last-message-date') lastMessageDate: Date,
  ): Promise<{ messages: Message[]; hasMorePages: boolean }> {
    return this.messagesService.loadMoreMessages(lastMessageDate);
  }

  @Get(':id')
  async getAllMessagesByUser(@Param('id') id: string): Promise<Message[]> {
    return this.messagesService.findAllMessagesByUser(id);
  }
}
