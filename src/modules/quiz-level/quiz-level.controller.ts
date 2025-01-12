import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizLevelService } from './quiz-level.service';
import { CreateQuizLevelDto } from './dto/create-quiz-level.dto';
import { UpdateQuizLevelDto } from './dto/update-quiz-level.dto';

@Controller('quiz-level')
export class QuizLevelController {
  constructor(private readonly quizLevelService: QuizLevelService) {}

  @Post()
  create(@Body() createQuizLevelDto: CreateQuizLevelDto) {
    return this.quizLevelService.create(createQuizLevelDto);
  }

  @Get()
  findAll() {
    return this.quizLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizLevelDto: UpdateQuizLevelDto) {
    return this.quizLevelService.update(+id, updateQuizLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizLevelService.remove(+id);
  }
}
