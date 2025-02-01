import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { MATERIAL } from 'src/constant';
import { isEmptyArray, isEmptyObject, isEqual } from 'src/utils/conditionals';
import { QuestionService } from '../question/question.service';
import { instanceToPlain } from 'class-transformer';
import { shuffleArray } from 'src/utils/array';
import { SubmitQuiz } from './dto/SubmitQuiz';
import { History } from '../history/entities/history.entity';
import { HistoryService } from '../history/history.service';
import { Tracker } from '../tracker/entities/tracker.entity';
import { TrackerService } from '../tracker/tracker.service';
import { Score } from '../scores/entities/scores.entity';
import { ScoreService } from '../scores/scores.service';
import { Question } from '../question/entities/question.entities';
import { InquiryQuiz } from './dto/inquiryQuiz';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    private readonly questionService: QuestionService,
    private readonly historyService: HistoryService,
    private readonly trackerService: TrackerService,
    private readonly scoreService: ScoreService
  ) {}

  private constructLevel(name: string) {
    return Array.from({ length: 3 }, (_, i) => ({
      level: i + 1,
      parent: name.toUpperCase(),
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
        materialParent: name.toUpperCase()
      }
    });

    if(isEmptyArray(quizzes)) {
      quizzes = await this.generateQuiz(name);
    }

    return quizzes;
  }

  async getByNameAndLevel(name: string, id: string) {
    if(name !== 'hiragana' && name !== 'katakana') {
      throw new HttpException(`Unknown material ${name}`, 404);
    }

    let quiz: any;
    let questions: Question[];

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

    const questionObject = {
      ...quiz,
      questions: shuffleArray(questions),
      total: questions.length
    }

    return instanceToPlain(questionObject);
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
      const question = questions.find((q: { id: string; }) => isEqual(q.id,answer.questionId));

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

  async inquiryQuiz(body: InquiryQuiz, credentials: string) {
    const [questions, quizLevel] = await Promise.all([
      this.questionService.getQuestionWithAnswer(body.quizId, body.section),
      this.quizRepository.findOne({ where: { id: body.quizId } })
    ]);

    log(`question found for session ${body.section} `, questions);

    if(!questions || !quizLevel) {
      throw new HttpException(`Quiz with id ${body.quizId} not found`, 404);
    }

    log(`${credentials} inquiry quiz ${body.quizId} with section ${body.section}`);

    const history = await this.historyService.findHistorySection(credentials, quizLevel, body.section);

    if(isEmptyObject(history)) {
      log('no history found for this quiz ', { quizId: body.quizId, userId: credentials, section: body.section });

      await this.historyAndTracker(credentials, quizLevel, body.section, 0, 0);

      return {
        successInquiry: true,
      }
    }

    return {
      successInquiry: false,
    }
  }

  async submitQuiz(body: SubmitQuiz, credentials: string) {
    const [questions, quizLevel] = await Promise.all([
      this.questionService.getQuestionWithAnswer(body.quizId, body.section),
      this.quizRepository.findOne({ where: { id: body.quizId } })
    ]);

    if(isEmptyArray(questions)) {
      throw new HttpException(`Quiz with id ${body.quizId} not found`, 404);
    }

    const finalScores = this.checkScore(body, questions, quizLevel);
    log(`${credentials} submit quiz ${body.quizId} and got total score ${finalScores}`);

    return this.historyAndTracker(credentials, quizLevel, body.section, finalScores, 1);
  }

  private async historyAndTracker(credentials: string, quizLevel: Quiz, section: string, finalScores: number, attempt: number) {
    const newHistory = new History();
    newHistory.userId = credentials;
    newHistory.quiz = quizLevel;
    newHistory.section = section;
    newHistory.attempt = attempt;

    const history = await this.historyService.upsert(newHistory);

    const newScore = new Score();
    newScore.userId = credentials;
    newScore.history = history;
    newScore.score = finalScores;

    await this.scoreService.save(newScore);

    const newTracker = new Tracker();
    newTracker.userId = credentials;
    newTracker.history = history;

    await this.trackerService.create(newTracker);

    return {
      ...history,
      score: newScore.score
    };
  }

  async histories(credentials: string) {
    const res = await this.historyService.findAll(credentials);

    return res;
  }

  async trackers(credentials: string) {
    const res = await this.trackerService.get(credentials);

    return res;
  }

}
