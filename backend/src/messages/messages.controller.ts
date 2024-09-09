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
  async getAllMessagesByPagination(
    @Query('page') page: number,
  ): Promise<Message[]> {
    return this.messagesService.findAllMessagesByPagination(page);
  }

  @Get(':id')
  async getAllMessagesByUser(@Param('id') id: string): Promise<Message[]> {
    return this.messagesService.findAllMessagesByUser(id);
  }
}
