import { Injectable } from '@nestjs/common';
import { LetterService } from '../letter/letter.service';

@Injectable()
export class QuestionService {
      constructor(private readonly letterService: LetterService) {}
    
      async findByName(name: string) {
        return this.letterService.fetchLetterByName(name);
      }
}
