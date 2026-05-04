import { Injectable } from '@nestjs/common';

import { AssistantRepository } from '../common/assistant.repository';

@Injectable()
export class ProvidersService {
  constructor(private readonly assistantRepository: AssistantRepository) {}

  list(capability?: string) {
    return this.assistantRepository.listProviders(capability);
  }
}