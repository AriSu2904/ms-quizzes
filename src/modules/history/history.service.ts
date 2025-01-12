import { Injectable } from '@nestjs/common';
import { HistoryResponse } from './dto/historyResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { log } from 'console';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private readonly historyRepository: Repository<History>,
  ) {}

  findAll(credentials: string): Promise<HistoryResponse[]> {
    return this.historyRepository.find({ where: { userId: credentials } });
  }

  findOne(id: string, credentials: string): Promise<HistoryResponse> {
    return this.historyRepository.findOne({ where: { id: id, userId: credentials } });
  }

  async upsert(history: History): Promise<History> {
    let existData = await this.historyRepository.findOne({ where: { id: history.id, userId: history.userId } });

    if(existData) {
      log('found existing data');
      history.id = existData.id;
      history.attempt = existData.attempt + 1;
    }

    return this.historyRepository.save(history);
  }
}
