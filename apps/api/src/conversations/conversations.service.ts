import { Injectable } from '@nestjs/common';

import { AssistantRepository } from '../common/assistant.repository';

@Injectable()
export class ConversationsService {
  constructor(private readonly assistantRepository: AssistantRepository) {}

  list() {
    return this.assistantRepository.listConversationSummaries();
  }

  getOne(conversationId: string) {
    return this.assistantRepository.getConversation(conversationId);
  }
}