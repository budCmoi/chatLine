import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { AssistantRepository } from '../common/assistant.repository';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        AssistantRepository,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => undefined),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
  });

  it('returns a conversational greeting in fast mode', async () => {
    const response = await chatService.respond({
      conversationId: 'conv-test-fast',
      prompt: 'salut',
      providerId: 'openai-gpt',
      mode: 'fast',
    });

    expect(response.content).toContain('Salut');
    expect(response.content).not.toContain('ROUTING>');
    expect(response.content).not.toContain('ready.');
  });

  it('avoids routing metadata in expert mode', async () => {
    const response = await chatService.respond({
      conversationId: 'conv-test-expert',
      prompt: 'Corrige un bug Expo qui casse le reseau local',
      providerId: 'anthropic-claude',
      mode: 'expert',
    });

    expect(response.content).not.toContain('ROUTING>');
    expect(response.content).not.toContain('NEXT>');
    expect(response.content).toContain('diagnostic');
  });
});