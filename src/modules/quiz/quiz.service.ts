import { HttpException, Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { MATERIAL } from 'src/constant';
import { isEmptyArray } from 'src/utils/conditionals';
import { QuestionService } from '../question/question.service';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    private readonly questionService: QuestionService
  ) {}

  private constructLevel(name: string) {
    return Array.from({ length: 4 }, (_, i) => ({
      level: i + 1,
      parent: name,
      score: 10
    }));
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

  async generateQuiestion(quizLevel: Quiz) {
    log('generate questions for quiz level ', quizLevel.level);


  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  async getById(id: number) {
    const quizLevel = await this.quizRepository.findOne({
      where: {
        id
      },
      relations: ['questions']
    });

    if(!quizLevel) {
      throw new HttpException(`Quiz level with id ${id} not found`, 404);
    }

    if(isEmptyArray(quizLevel.questions)) {
      const questions = await this.questionService.generateQuestion(quizLevel);

      quizLevel.questions = questions;
      await this.quizRepository.save(quizLevel);
    }

    quizLevel.questions = this.shuffleArray(quizLevel.questions);
    
    return quizLevel;
  }


}
