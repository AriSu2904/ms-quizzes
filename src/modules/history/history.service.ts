import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { log } from 'console';
import { HistoryResponse } from './dto/historyResponse';
import { CommonResponse } from 'src/shared/CommonResponse';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private readonly historyRepository: Repository<History>,
  ) {}

  async findAll(credentials: string) {
    const histories = await this.historyRepository.find({ where: { userId: credentials }, relations: ['quiz', 'scores'] });

    const result = histories.map(history => {
      return {
        id: history.id,
        userId: history.userId,
        totalAttempt: history.attempt,
        quizId: history.quiz.id,
        quizLevel: history.quiz.level,
        materialParent: history.quiz.materialParent,
        scores: history.scores.map(score => score.score)
      }
    });

    return CommonResponse(result)
  }

  findOne(id: string, credentials: string) {
    return this.historyRepository.findOne({ where: { id: id, userId: credentials } });
  }

  async upsert(history: History): Promise<History> {
    let existData = await this.historyRepository.findOne(
      { where: {
        userId: history.userId,
        quiz: history.quiz
      } 
    });

    if(existData) {
      log('found existing data');
      history.id = existData.id;
      history.attempt = existData.attempt + 1;
    }

    return this.historyRepository.save(history);
  }
}
