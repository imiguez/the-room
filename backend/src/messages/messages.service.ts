import { Injectable } from '@nestjs/common';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findAllMessagesByPagination(
    lastMessageDate: Date,
  ): Promise<{ messages: Message[]; hasMorePages: boolean }> {
    lastMessageDate = lastMessageDate ? new Date(lastMessageDate) : new Date();
    const limit = 20;
    const messages = await this.messageModel
      .find({
        date: { $lt: lastMessageDate }, // Filter for documents with date earlier than the given date
      })
      .sort({ date: -1 }) // Order by date, descending (newest first)
      .limit(limit)
      .populate({
        path: 'author',
        select: {
          email: 0,
        },
      }) // Fill in the author property without the email.
      .exec();

    let hasMorePages = false;
    if (messages.length > 0) {
      // If the amount of messages are less than the limit it means that the query reach the last message, thus there isn't more pages.
      if (messages.length < limit) hasMorePages = false;
      else {
        const lastMessageDate = new Date(messages[messages.length - 1].date);
        hasMorePages =
          (await this.messageModel.countDocuments({
            date: { $lt: lastMessageDate },
          })) > 0;
      }
    }
    return { messages, hasMorePages };
  }

  async findAllMessagesByUser(id: string): Promise<Message[]> {
    return this.messageModel.find({ author: id }).exec();
  }
}
