import { HttpException, Injectable } from '@nestjs/common';
import { LetterService } from '../letter/letter.service';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Question } from './entities/question.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';
import { shuffleArray } from 'src/utils/array';
import { isEqual } from 'src/utils/conditionals';

@Injectable()
export class QuestionService {
      constructor(
        private readonly letterService: LetterService,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>
      ) {}

    async getQuestion(id: string) {
        const questions = await this.questionRepository.find({ where: { quiz: { id } } });

       const modifiedQuestions = questions.map((question: any) => {
          const options = question.options;
           question.options = shuffleArray(options);

           return question;
       });

       return modifiedQuestions;
    }

    generateOptions(letter: any, letters: any) {
        const correctAnswer = letter.romaji;
        const sameLevelLetters = letters.filter((l: any) => isEqual(l.level, letter.level) && l.romaji !== correctAnswer);
    
        // Shuffle the sameLevelLetters array
        for (let i = sameLevelLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sameLevelLetters[i], sameLevelLetters[j]] = [sameLevelLetters[j], sameLevelLetters[i]];
        }
    
        // Select the first 3 elements
        const selectedLetters = sameLevelLetters.slice(0, 3);
    
        // Create options array with the correct answer and the selected letters
        const options = [correctAnswer, ...selectedLetters.map((l: any) => l.romaji)];
    
        // Shuffle the options array to randomize the position of the correct answer
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    
        return options;
    }

    async generateQuestion(quiz: Quiz) {
        const parent = quiz.materialParent;
        const level = quiz.level;

        const letters = await this.letterService.fetchLetterByName(parent, level);

        const questions = letters.map((letter) => {
          if(letter.level !== level) {
            console.error('Letter level is not the same as quiz level');
          }

            const question = new Question();
            question.questionImg = letter.imgUri;
            question.questionAud = letter.audioUri;
            question.answer = letter.romaji;
            question.questionImgSecond = letter.secondImgUri;
            question.questionImgDetail = letter.secondImgDetailUri;
            question.level = letter.level;
            question.options = this.generateOptions(letter, letters)
            question.quiz = quiz;

            return question;  
          });

          const quest = await this.questionRepository.save(questions);

          log(`success generate questions for level ${level} with total data ${quest.length}`);

          return quest;
    }

    getQuestionWithAnswer(id: string) {
        return this.questionRepository.find({
          where: { quiz: { id } },
          select: ['id', 'answer', 'level', 'questionAud', 'questionImg']
        }
        );
    }
}
