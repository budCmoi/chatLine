import { Module } from '@nestjs/common';

import { AssistantRepository } from './assistant.repository';

@Module({
  providers: [AssistantRepository],
  exports: [AssistantRepository],
})
export class CommonModule {}