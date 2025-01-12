import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizLevel } from "src/modules/quiz-level/entities/quiz-level.entity";
import { Question } from "src/modules/question/entities/question.entities";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column()
    level: number;

    @OneToOne(() => QuizLevel)
    quizLevel: QuizLevel;

    @Column()
    maxScore: number;

    @Column()
    minScore: number;

    @OneToMany(() => Question, question => question.id)
    questions: Question[];
}
