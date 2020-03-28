import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis.Redis;

  constructor(@Inject('CONFIG') config: any) {
    // this.redis = new Redis(config.redis.host, {
    //   password: config.redis.password,
    //   port: config.redis.port,
    // });
    console.log('Creating Redis instance');
  }

  getInstance(): Redis.Redis {
    return this.redis;
  }
}
