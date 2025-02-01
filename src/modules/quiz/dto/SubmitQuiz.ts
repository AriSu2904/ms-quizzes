export interface SubmitQuiz {
    quizId: string; // Quiz Id UUID
    answers: Answer[];
    materialParent: string;
    level: number;
    section: string;
    }

export interface Answer {
    questionId: string;
    targetAnswer: string;
    }