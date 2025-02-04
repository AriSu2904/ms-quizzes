import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tracker } from './entities/tracker.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { TrackerResponse } from './dto/trackerResponse';
import { CommonResponse } from 'src/shared/CommonResponse';

@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker) private trackerRepository: Repository<Tracker>,
  ) { }

  async create(createTracker: Tracker) {
    let existData = await this.trackerRepository.findOne(
      {
        where: {
          userId: createTracker.userId,
        },
        relations: ['history']
      });

    if (existData) {
      log('found existing data');
      createTracker.id = existData.id;
    }

    return this.trackerRepository.save(createTracker);
  }

  async get(userId: string) {
    const lastTracker = await this.trackerRepository.findOne({
      where: { userId },
      relations: ['history', 'history.quiz', 'history.scores', ]
    });

    if (!lastTracker) {
      Logger.error('Tracker not found for user: ' + userId);

      return CommonResponse(null, 'Tracker not found');
    }

    const highestScore = lastTracker.history.scores.reduce((max, score) => {
      return score.score > max ? score.score : max;
    }, 0);
    const scoreLength = lastTracker.history.scores.length;
    const scores = lastTracker.history.scores;

    const response: TrackerResponse = {
      id: lastTracker.id,
      userId: lastTracker.userId,
      totalAttempt: lastTracker.history.attempt,
      quizId: lastTracker.history.quiz.id,
      section: lastTracker.history.section,
      quizLevel: lastTracker.history.quiz.level,
      materialParent: (lastTracker.history.quiz.materialParent).toUpperCase(),
      inquiryUsed: lastTracker.history.inquiryUsed,
      highestScore,
      currentScore: scores[scoreLength - 1].score
    }

    return CommonResponse(response);
  }
}
