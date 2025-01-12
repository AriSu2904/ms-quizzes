import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { RedisModule } from '../redis/redis.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
