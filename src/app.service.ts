import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPort(): string {
    return 'The Port Works :)';
  }
}
