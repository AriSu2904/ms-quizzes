import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_quiz_level' })
export class QuizLevel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    level: number;

    @Column()
    parent: string;
}
