import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('api/v1/quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.quizService.findByName(name);
  }
}
