import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [LetterController],
  providers: [LetterService],
  exports: [LetterService],
})
export class LetterModule {}
