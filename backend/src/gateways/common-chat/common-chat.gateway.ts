import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ExpressSessionAuthGuard } from 'src/auth/guards/express-session.guard';
import { CreateMessageDto } from 'src/messages/dtos/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { SocketAuthMiddleware } from '../middlewares/auth.middleware';
import { SocketExpressSession } from '../types/session.type';
import { MessageWithAuthorDto } from 'src/messages/dtos/message-with-author.dto';

interface CustomSocket extends Socket {
  data: {
    session: SocketExpressSession;
  };
}

@WebSocketGateway({
  namespace: 'common-chat',
  cors: {
    origin: '*',
  },
})
@UseGuards(ExpressSessionAuthGuard)
export class CommonChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    // This Middleware is executed only before a new socket connection is established.
    // The ExpressSessionAuthGuard is in charge to runs before every socket event is executed.
    this.server.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: CustomSocket) {
    console.log('OPEN', client.id);
  }

  handleDisconnect(client: CustomSocket) {
    console.log('CLOSE', client.id);
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() message: CreateMessageDto,
  ): Promise<MessageWithAuthorDto | null> {
    try {
      const messageCreated = await this.messagesService.create(message);
      const messageCreatedWithAuthor: MessageWithAuthorDto = {
        author: client.data.session.passport.user,
        content: messageCreated.content,
        _id: messageCreated._id,
        date: messageCreated.date,
      };
      client.broadcast.emit('new-message', messageCreatedWithAuthor);
      return messageCreatedWithAuthor;
    } catch (error) {
      return null;
    }
  }
}
