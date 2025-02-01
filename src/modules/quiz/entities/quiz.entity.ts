import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
