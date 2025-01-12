import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_question' })
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'question_img' })
    questionImg: string;

    @Column({ name: 'question_aud' })
    questionAud: string;

    @Column()
    answer: string;

    @Column()
    level: number;

    @Column('simple-array')
    options: string[];

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;
}