import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizLevel } from './entities/quiz-level.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { isEmptyArray } from 'src/utils/conditionals';
import { MATERIAL } from 'src/constant';

@Injectable()
export class QuizLevelService {

  constructor(
    @InjectRepository(QuizLevel) private quizLevelRepository: Repository<QuizLevel>,
  ) {}

  async getQuizzes(name: string) {
    log('get quizzes for material ', name);

    let quizzes = await this.quizLevelRepository.find({
      where: {
        parent: name
      }
    });

    if(isEmptyArray(quizzes)) {
      quizzes = await this.generateQuiz(name);
    }

    return quizzes;
  }

  generateQuiz(name: string) {
    log('generate quizzes for material ', name);

    if(!MATERIAL.includes(name.toUpperCase())) {
      throw new HttpException(`Unknown material ${name}`, 404);
    }

    const levels = this.constructLevel(name);

    const quizLevels = levels.map(level => ({
      level: level.level,
      parent: level.parent
    }));

    return this.quizLevelRepository.save(quizLevels);
  }

  private constructLevel(name: string) {
    return [
      {
        level: 1,
        parent: name
      },
      {
        level: 2,
        parent: name
      },
      {
        level: 3,
        parent: name
      },
      {
        level: 4,
        parent: name
      }
    ]
  }
}
