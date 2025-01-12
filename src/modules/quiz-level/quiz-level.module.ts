import { Module } from '@nestjs/common';
import { QuizLevelService } from './quiz-level.service';
import { MaterialModule } from '../material/material.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizLevel } from './entities/quiz-level.entity';

@Module({
  imports: [MaterialModule, TypeOrmModule.forFeature([QuizLevel])],
  providers: [QuizLevelService],
  exports: [QuizLevelService],
})
export class QuizLevelModule {}
