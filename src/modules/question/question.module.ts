import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { LetterModule } from '../letter/letter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entities';

@Module({
  imports: [LetterModule, TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
