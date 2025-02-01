import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Score } from "src/modules/scores/entities/scores.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_history' })
export class History {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => Quiz)
    @JoinColumn()
    quiz: Quiz;

    @Column({ default: 0 })
    attempt: number;

    @Column({ nullable: false })
    section: string;

    @Column({ name: 'inquiry_used', default: false })
    inquiryUsed: boolean;

    @OneToMany(() => Score, scores => scores.history)
    scores: Score[];
}
