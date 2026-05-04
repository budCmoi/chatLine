import { Body, Controller, Post } from '@nestjs/common';

import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatService } from './chat.service';

@Controller('v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('respond')
  respond(@Body() payload: ChatRequestDto) {
    return this.chatService.respond(payload);
  }
}