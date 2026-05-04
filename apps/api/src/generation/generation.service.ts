import { Injectable } from '@nestjs/common';

import { AssistantRepository } from '../common/assistant.repository';
import { CreateGenerationJobDto } from './dto/create-generation-job.dto';

@Injectable()
export class GenerationService {
  constructor(private readonly assistantRepository: AssistantRepository) {}

  listLibrary() {
    return this.assistantRepository.listLibrary();
  }

  createJob(payload: CreateGenerationJobDto) {
    const provider =
      this.assistantRepository.getProvider(payload.providerId) ??
      this.assistantRepository.listProviders(payload.kind)[0] ??
      this.assistantRepository.listProviders()[0];

    const asset = {
      id: `asset-${Date.now()}`,
      title: `${payload.kind.toUpperCase()} / ${provider.name}`,
      summary: `${payload.style} :: ${payload.prompt.replace(/\s+/g, ' ').trim()}`,
      kind: payload.kind,
      folder: this.assistantRepository.resolveFolder(payload.kind),
      providerId: provider.id,
      status: 'queued' as const,
      updatedAt: new Date().toISOString(),
    };

    return this.assistantRepository.prependAsset(asset);
  }
}