import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CommonResponse } from 'src/shared/CommonResponse';

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService
  ) {}

  @Get(':name')
  async getQuizzes(@Param('name') name: string) {
    const quizzes = await this.quizService.getQuizzes(name);

    return CommonResponse(quizzes);
  }

  @Get('level/:id')
  async findById(@Param('id') id: number) {
    const quiz = await this.quizService.getById(id);

    return CommonResponse(quiz);
  }
}
