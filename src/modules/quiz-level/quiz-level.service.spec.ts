import { Test, TestingModule } from '@nestjs/testing';
import { QuizLevelService } from './quiz-level.service';

describe('QuizLevelService', () => {
  let service: QuizLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizLevelService],
    }).compile();

    service = module.get<QuizLevelService>(QuizLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
