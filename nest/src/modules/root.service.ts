import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  getAll(): string {
    return 'I want it all!';
  }
}
