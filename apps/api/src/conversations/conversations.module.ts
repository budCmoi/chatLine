import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [CommonModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}