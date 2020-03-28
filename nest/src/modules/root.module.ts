import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { GeoModule } from './geo';

@Module({
  imports: [GeoModule],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
