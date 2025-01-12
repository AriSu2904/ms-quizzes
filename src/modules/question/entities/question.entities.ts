import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    question: string;
    answer: string;
    level: number;
    options: string[];
}