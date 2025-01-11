import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [LetterService],
  exports: [LetterService],
})
export class LetterModule {}
