import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CommonResponse } from 'src/shared/CommonResponse';
import { SubmitQuiz } from './dto/SubmitQuiz';
import { REQUEST } from '@nestjs/core';
import { extractUserId } from 'src/utils/authDecoder';

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    @Inject(REQUEST) private readonly req: any
  ) {}

  @Get('detail/:name')
  async getQuizzes(@Param('name') name: string) {
    const quizzes = await this.quizService.getQuizzes(name);

    return CommonResponse(quizzes);
  }

  @Get('questions/:name')
  async findById(@Param('name') name: string, @Query('id') id: string) {
    const quiz = await this.quizService.getByNameAndLevel(name, id);

    return CommonResponse(quiz);
  }

  @Post('submit')
  async submit( @Body() request: SubmitQuiz) {
    const authHeader = this.req.headers['authorization'];
    const credentials = extractUserId(authHeader);

    return this.quizService.submitQuiz(request, credentials);
  }

  @Get('history')
  async getHistory() {
    const authHeader = this.req.headers['authorization'];
    const credentials = extractUserId(authHeader);
  
    return this.quizService.histories(credentials);
   }

  @Get('tracker')
  async getTracker() {
    const authHeader = this.req.headers['authorization'];
    const credentials = extractUserId(authHeader);
  
    return this.quizService.trackers(credentials);
  }

  
}
