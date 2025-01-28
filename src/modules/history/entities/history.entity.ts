import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Score } from "src/modules/scores/entities/scores.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_history' })
export class History {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @OneToOne(() => Quiz)
    @JoinColumn()
    quiz: Quiz;

    @Column({ default: 0 })
    attempt: number;

    @OneToMany(() => Score, scores => scores.history)
    scores: Score[];
}
