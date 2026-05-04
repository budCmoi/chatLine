import { Controller, Get, Query } from '@nestjs/common';

import { ProvidersService } from './providers.service';

@Controller('v1/providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  list(@Query('capability') capability?: string) {
    return {
      items: this.providersService.list(capability),
    };
  }
}