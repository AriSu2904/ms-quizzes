import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizLevelModule } from '../quiz-level/quiz-level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), QuizLevelModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
