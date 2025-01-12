import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'm_question' })
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    question: string;
    answer: string;
    level: number;
    options: string[];
}