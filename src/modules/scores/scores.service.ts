import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/scores.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
  ) {}

  findAll(credentials: string) {
    return this.scoreRepository.find({ where: { userId: credentials }, relations: ['quiz'] });
  }
  
  save(score: Score): Promise<Score> {
    return this.scoreRepository.save(score);
  }
}

