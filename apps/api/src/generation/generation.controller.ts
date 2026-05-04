import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateGenerationJobDto } from './dto/create-generation-job.dto';
import { GenerationService } from './generation.service';

@Controller('v1/generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get('library')
  listLibrary() {
    return {
      items: this.generationService.listLibrary(),
    };
  }

  @Post('jobs')
  createJob(@Body() payload: CreateGenerationJobDto) {
    return this.generationService.createJob(payload);
  }
}