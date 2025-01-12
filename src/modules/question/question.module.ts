import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { LetterModule } from '../letter/letter.module';

@Module({
  imports: [LetterModule],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
