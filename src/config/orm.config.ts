import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Question } from "src/modules/question/entities/question.entities";
import { QuizLevel } from "src/modules/quiz-level/entities/quiz-level.entity";
import { Quiz } from "src/modules/quiz/entities/quiz.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    entities: [QuizLevel, Quiz, Question],
    database: 'p3tki',
    synchronize: true,
    logging: true,
}));