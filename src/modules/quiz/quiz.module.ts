import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionModule } from '../question/question.module';
import { HistoryModule } from '../history/history.module';
import { TrackerModule } from '../tracker/tracker.module';
import { ScoreModule } from '../scores/scores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), QuestionModule, HistoryModule, TrackerModule, ScoreModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
