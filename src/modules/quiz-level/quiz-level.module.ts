import { Module } from '@nestjs/common';
import { QuizLevelService } from './quiz-level.service';
import { QuizLevelController } from './quiz-level.controller';

@Module({
  controllers: [QuizLevelController],
  providers: [QuizLevelService],
})
export class QuizLevelModule {}
