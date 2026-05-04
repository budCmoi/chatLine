import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';

@Module({
  imports: [CommonModule],
  controllers: [GenerationController],
  providers: [GenerationService],
})
export class GenerationModule {}