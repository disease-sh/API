import { Module } from '@nestjs/common';
import { RedisService } from './service';
import config from '../../config.json';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'CONFIG',
      useValue: config,
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
