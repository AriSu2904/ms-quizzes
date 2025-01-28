import { History } from "src/modules/history/entities/history.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_scores' })
export class Score {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => History, history => history.scores)
    history: History;

    @Column('float', { name: 'last_score', nullable: true })
    score: number;
}
