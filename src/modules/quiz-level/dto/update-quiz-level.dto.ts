import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizLevelDto } from './create-quiz-level.dto';

export class UpdateQuizLevelDto extends PartialType(CreateQuizLevelDto) {}
