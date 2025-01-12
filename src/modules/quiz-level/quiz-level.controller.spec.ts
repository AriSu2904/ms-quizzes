import { Test, TestingModule } from '@nestjs/testing';
import { QuizLevelController } from './quiz-level.controller';
import { QuizLevelService } from './quiz-level.service';

describe('QuizLevelController', () => {
  let controller: QuizLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizLevelController],
      providers: [QuizLevelService],
    }).compile();

    controller = module.get<QuizLevelController>(QuizLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
