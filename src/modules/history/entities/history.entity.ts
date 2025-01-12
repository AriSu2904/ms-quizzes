import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('float', { name: 'last_score', nullable: true })
    lastScore: number;
}
