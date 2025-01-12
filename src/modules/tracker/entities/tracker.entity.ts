import { History } from "src/modules/history/entities/history.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_tracker' })
export class Tracker {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @OneToOne(() => History)
    @JoinColumn()
    history: History;

}
