import { Controller } from '@nestjs/common';
import { LetterService } from './letter.service';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
}
