import { Injectable } from '@nestjs/common';
import { LetterService } from '../letter/letter.service';

@Injectable()
export class QuizService {

  constructor(private readonly letterService: LetterService) {}

  findByName(name: string) {
    return this.letterService.fetchLetterByName(name);
  }
}
