import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  namespace: 'common-chat',
  cors: {
    origin: '*',
  },
})
export class CommonChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
  }
}
