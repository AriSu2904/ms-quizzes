import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/scores.entity';
import { ScoreService } from './scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoreService],
  exports: [ScoreService]
})
export class ScoreModule {}
