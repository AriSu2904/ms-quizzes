import { Controller, Get, Param, Headers } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.quizService.findByName(name);
  }
}
