import { Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  getById(id: string) {
    return this.quizRepository.findOne({
      where: {
        id
      }
    });
  }
}
