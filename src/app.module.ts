import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './modules/quiz/quiz.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/auth.guard';
import { QuizLevelModule } from './modules/quiz-level/quiz-level.module';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'p3tki',
      synchronize: true,
      logging: true,
    }),
    QuizModule,
    AuthModule,
    QuizLevelModule,
    QuestionModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
