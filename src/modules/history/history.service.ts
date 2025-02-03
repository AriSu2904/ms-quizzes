import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { log } from 'console';
import { HistoryResponse } from './dto/historyResponse';
import { CommonResponse } from 'src/shared/CommonResponse';
import { Quiz } from '../quiz/entities/quiz.entity';

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
        section: history.section,
        inquiryUsed: history.inquiryUsed,
        materialParent: history.quiz.materialParent,
        scores: history.scores.map(score => score.score)
      }
    });

    return CommonResponse(result)
  }

  async findHistorySection(credentials: string, quiz: Quiz, section: string) {
    return this.historyRepository.find({ where: { userId: credentials, quiz, section }, relations: ['quiz', 'scores'] });
  }

  async findHistoryByQuizId(credential: string, quizId: string) {
    const histories = await this.historyRepository.find({ where: { userId: credential, quiz: { id: quizId } }, relations: ['quiz', 'scores'] });

    const result = histories.map(history => {
      return {
        id: history.id,
        userId: history.userId,
        totalAttempt: history.attempt,
        quizId: history.quiz.id,
        quizLevel: history.quiz.level,
        section: history.section,
        inquiryUsed: history.inquiryUsed,
        materialParent: history.quiz.materialParent,
        scores: history.scores.map(score => score.score)
      }
    });

    return CommonResponse(result)
  }

  async upsert(history: History): Promise<History> {
    let existData = await this.historyRepository.findOne(
      {
        where: {
          userId: history.userId,
          quiz: history.quiz,
          section: history.section,
        }
      });

    if (existData) {
      log('found existing data');
      history.id = existData.id;
      history.inquiryUsed = true;
      history.attempt = existData.attempt + 1;
    }

    return this.historyRepository.save(history);
  }
}
