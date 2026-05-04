import { Controller, Get, Param } from '@nestjs/common';

import { ConversationsService } from './conversations.service';

@Controller('v1/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  list() {
    return {
      items: this.conversationsService.list(),
    };
  }

  @Get(':conversationId')
  getOne(@Param('conversationId') conversationId: string) {
    return this.conversationsService.getOne(conversationId);
  }
}