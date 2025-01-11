import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { LetterService } from '../letter/letter.service';

@Injectable()
export class QuizService {

  constructor(private readonly letterService: LetterService) {}

  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  findByName(name: string) {
    return this.letterService.fetchLetterByName(name);
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
