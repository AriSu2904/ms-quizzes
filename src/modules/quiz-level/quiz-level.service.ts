import { Injectable } from '@nestjs/common';
import { CreateQuizLevelDto } from './dto/create-quiz-level.dto';
import { UpdateQuizLevelDto } from './dto/update-quiz-level.dto';

@Injectable()
export class QuizLevelService {
  create(createQuizLevelDto: CreateQuizLevelDto) {
    return 'This action adds a new quizLevel';
  }

  findAll() {
    return `This action returns all quizLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizLevel`;
  }

  update(id: number, updateQuizLevelDto: UpdateQuizLevelDto) {
    return `This action updates a #${id} quizLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizLevel`;
  }
}
