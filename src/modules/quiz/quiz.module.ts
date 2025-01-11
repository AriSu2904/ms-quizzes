import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { LetterModule } from '../letter/letter.module';

@Module({
  imports: [LetterModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
