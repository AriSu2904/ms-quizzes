import { Question } from "src/modules/question/entities/question.entities";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_quiz' })
export class Quiz {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'material_parent' })
    materialParent: string;

    @Column()
    level: number;

    @Column({ nullable: true })
    score: number;

    @OneToMany(() => Question, (question) => question.quiz)
    @JoinColumn({ name: 'id' })
    questions: Question[];
}
