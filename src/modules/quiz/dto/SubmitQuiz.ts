export interface SubmitQuiz {
    quizId: number; // Quiz Id incerement 1 2 3 4 5 6 7 8
    answers: Answer[];
    materialParent: string;
    level: number;
    }

export interface Answer {
    questionId: string;
    targetAnswer: string;
    }