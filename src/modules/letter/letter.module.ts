import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [LetterService],
  exports: [LetterService],
})
export class LetterModule {}
