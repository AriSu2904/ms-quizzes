import { Controller, Get, Param, Headers } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CommonResponse } from 'src/shared/CommonResponse';
import { QuizLevelService } from '../quiz-level/quiz-level.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService, private readonly quizLevel: QuizLevelService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const quiz = this.quizService.getById(id);

    return CommonResponse(quiz);
  }

  @Get('levels/:name')
  async findByName(@Param('name') name: string) {
    const quizLevel = await this.quizLevel.getQuizzes(name);

    console.log('quizLevel', quizLevel);

    return CommonResponse(quizLevel);
  }
}
