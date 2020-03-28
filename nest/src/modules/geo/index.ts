import { Module } from '@nestjs/common';
import { GeoController } from './controller';
import { GeoService } from './service';
import { RedisModule } from '../redis/module';

@Module({
  imports: [RedisModule],
  controllers: [GeoController],
  providers: [GeoService],
})
export class GeoModule {}
