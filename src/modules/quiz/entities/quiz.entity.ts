import { Question } from "src/modules/question/entities/question.entities";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_quiz' })
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'material_parent' })
    materialParent: string;

    @Column()
    level: number;

    @Column({ nullable: true })
    score: number;

    @OneToMany(() => Question, question => question.id)
    @JoinColumn({ name: 'id' })
    questions: Question[];
}
