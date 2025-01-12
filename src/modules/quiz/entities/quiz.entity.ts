import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizLevel } from "src/modules/quiz-level/entities/quiz-level.entity";
import { Question } from "src/modules/question/entities/question.entities";

@Entity({ name: 'm_quiz' })
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => QuizLevel)
    @JoinColumn({ name: 'quiz_level_id' })
    quizLevel: QuizLevel;

    @OneToMany(() => Question, question => question.id)
    questions: Question[];

    @Column()
    score: number;
}
