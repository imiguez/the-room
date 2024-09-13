import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type UserDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  })
  _id: string;

  @Prop({
    required: true,
    maxlength: [300, 'Message cannot be more than 300 characters long'],
  })
  content: string;

  @Prop({ required: false, type: Date, default: () => new Date() })
  date: Date;

  @Prop({ type: String, ref: 'User' })
  author: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
