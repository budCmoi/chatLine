import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'chatline-api',
      timestamp: new Date().toISOString(),
    };
  }
}
