import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: '/assistant',
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    client.emit('assistant.ready', {
      status: 'online',
      transport: 'websocket',
    });
  }

  @SubscribeMessage('chat.request')
  async handleChatRequest(
    @MessageBody() payload: ChatRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    const response = await this.chatService.respond(payload);

    for (const chunk of chunkContent(response.content)) {
      client.emit('chat.delta', {
        conversationId: response.conversationId,
        providerId: response.providerId,
        chunk,
      });
    }

    client.emit('chat.completed', response);

    return {
      event: 'chat.ack',
      data: {
        accepted: true,
        conversationId: response.conversationId,
      },
    };
  }
}

function chunkContent(content: string): string[] {
  return content.split('\n');
}