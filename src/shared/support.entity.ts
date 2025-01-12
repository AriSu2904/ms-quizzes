// Objective: Define the parent entity for the quiz module such as HIRAGANA, KATAKANA or KANJI.
export class Parent {
    name: string;
    description: string;
    order: number;

    constructor(name: string, description: string, order: number) {
        this.name = name;
        this.description = description;
        this.order = order;
    }
}