import { HttpException, Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { MATERIAL } from 'src/constant';
import { isEmptyArray } from 'src/utils/conditionals';
import { QuestionService } from '../question/question.service';
import { instanceToPlain } from 'class-transformer';
import { shuffleArray } from 'src/utils/array';
import { SubmitQuiz } from './dto/SubmitQuiz';
import { History } from '../history/entities/history.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    private readonly questionService: QuestionService,
    private readonly historyService: HistoryService
  ) {}

  private constructLevel(name: string) {
    return Array.from({ length: 4 }, (_, i) => ({
      level: i + 1,
      parent: name,
      score: 10
    }));
  }

  private generateQuiz(name: string) {
    log('generate quizzes for material ', name);

    if(!MATERIAL.includes(name.toUpperCase())) {
      throw new HttpException(`Unknown material ${name}`, 404);
    }

    const levels = this.constructLevel(name);

    const quizLevels = levels.map(level => ({
      level: level.level,
      materialParent: level.parent,
      score: level.score
    }));

    return this.quizRepository.save(quizLevels);
  }

  async getQuizzes(name: string) {
    log('get quizzes for material ', name);

    let quizzes = await this.quizRepository.find({
      where: {
        materialParent: name
      }
    });

    if(isEmptyArray(quizzes)) {
      quizzes = await this.generateQuiz(name);
    }

    return quizzes;
  }

  async generateQuiestion(quizLevel: Quiz) {
    log('generate questions for quiz level ', quizLevel.level);


  }

  async getById(id: number) {
    let quiz: any;
    let questions: any;

    [quiz, questions] = await Promise.all([
      this.quizRepository.findOne({ where: { id } }),
      this.questionService.getQuestion(id)
    ]);

    if(!quiz) {
      throw new HttpException(`Quiz level with id ${id} not found`, 404);
    }

    if(isEmptyArray(questions)) {
      questions = await this.questionService.generateQuestion(quiz);
    }

    quiz.questions = shuffleArray(questions);
    quiz.total = quiz.questions.length;

    return instanceToPlain(quiz);
  }

  checkScore(body: SubmitQuiz, questions: any, quizLevel: any) {
    if(body.level !== quizLevel.level) {
      throw new HttpException(`Level mismatch for quiz with id ${body.quizId}`, 400);
    }

    if(body.answers.length !== questions.length) {
      throw new HttpException(`Question length mismatch for quiz with id ${body.quizId}`, 400);
    }

    let correctAns = 0;

    body.answers.forEach(answer => {
      const question = questions.find((q: { id: string; }) => q.id === answer.questionId);

      if(!question) {
        throw new HttpException(`Question with id ${answer.questionId} not found`, 404);
      }

      if(question.answer !== answer.targetAnswer) {
        return;
      }

      correctAns += 1;
    });

    const maxScore = 10;
    const fixedScore = (correctAns / questions.length) * maxScore;

    return parseFloat(fixedScore.toFixed(2));
  }

  async submitQuiz(body: SubmitQuiz, credentials: string) {
    const [questions, quizLevel] = await Promise.all([
      this.questionService.getQuestionWithAnswer(body.quizId),
      this.quizRepository.findOne({ where: { id: body.quizId } })
    ]);

    if(isEmptyArray(questions)) {
      throw new HttpException(`Quiz with id ${body.quizId} not found`, 404);
    }

    const finalScores = this.checkScore(body, questions, quizLevel);
    log(`${credentials} submit quiz ${body.quizId} and got total score ${finalScores}`);

    const newHistory = new History();
    newHistory.userId = credentials;
    newHistory.quiz = quizLevel;
    newHistory.lastScore = finalScores;
    newHistory.attempt = 1;

    return this.historyService.upsert(newHistory);
  }

}
