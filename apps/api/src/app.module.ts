import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { ConversationsModule } from './conversations/conversations.module';
import { GenerationModule } from './generation/generation.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    ProvidersModule,
    ConversationsModule,
    ChatModule,
    GenerationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
