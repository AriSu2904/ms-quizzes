import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { History } from "src/modules/history/entities/history.entity";
import { Question } from "src/modules/question/entities/question.entities";
import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Score } from "src/modules/scores/entities/scores.entity";
import { Tracker } from "src/modules/tracker/entities/tracker.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    entities: [Quiz, Question, Tracker, History, Score],
    database: 'p3tki',
    synchronize: true,
    logging: true,
  }));
  