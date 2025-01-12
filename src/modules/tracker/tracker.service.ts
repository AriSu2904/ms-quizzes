import { Injectable } from '@nestjs/common';
import { CreateTracker } from './dto/createTracker';

@Injectable()
export class TrackerService {
  create(createTrackerDto: CreateTracker) {
    return 'This action adds a new tracker';
  }

  findAll() {
    return `This action returns all tracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracker`;
  }
  
  remove(id: number) {
    return `This action removes a #${id} tracker`;
  }
}
