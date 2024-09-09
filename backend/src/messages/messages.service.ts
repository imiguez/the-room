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

  async findAllMessagesByPagination(page: number): Promise<Message[]> {
    const limit = 20;
    const skip = (page - 1) * limit;
    return this.messageModel
      .find() // Fetch all messages
      .sort({ date: -1 }) // Order by date, descending (newest first)
      .skip(skip) // Skip the documents based on the page number
      .limit(limit) // Limit the number of documents per page
      .populate('author') // Fill in the author property
      .exec(); // Execute the query
  }

  async findAllMessagesByUser(id: string): Promise<Message[]> {
    return this.messageModel.find({ author: id }).exec();
  }
}
