import { HttpException, Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { MATERIAL } from 'src/constant';
import { isEmptyArray } from 'src/utils/conditionals';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async getById(id: string) {
    const quizLevel = await this.quizRepository.findOne({
      where: {
        id
      }
    });
  }

  async getQuizzes(name: string) {
    log('get quizzes for material ', name);

    let quizzes = await this.quizRepository.find({
      where: {
        materialParent: name
      }
    });

    if(isEmptyArray(quizzes)) {
      quizzes = await this.generateQuiz(name);
    }

    return quizzes;
  }

  private generateQuiz(name: string) {
    log('generate quizzes for material ', name);

    if(!MATERIAL.includes(name.toUpperCase())) {
      throw new HttpException(`Unknown material ${name}`, 404);
    }

    const levels = this.constructLevel(name);

    const quizLevels = levels.map(level => ({
      level: level.level,
      materialParent: level.parent,
      score: level.score
    }));

    return this.quizRepository.save(quizLevels);
  }

  private constructLevel(name: string) {
    return [
      {
        level: 1,
        parent: name,
        score: 10
      },
      {
        level: 2,
        parent: name,
        score: 10
      },
      {
        level: 3,
        parent: name,
        score: 10
      },
      {
        level: 4,
        parent: name,
        score: 10
      }
    ]
  }
}
