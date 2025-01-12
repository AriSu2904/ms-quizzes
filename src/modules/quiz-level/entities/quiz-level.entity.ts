import { Parent } from "src/shared/support.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizLevel {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    level: number;

    @Column()
    parent: Parent;
}
