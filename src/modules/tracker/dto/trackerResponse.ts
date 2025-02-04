export interface TrackerResponse {
    id: string;
    userId: string;
    totalAttempt: number;
    quizId: string;
    quizLevel: number;
    section: string;
    materialParent: string;
    highestScore: number;
    currentScore: number;
    inquiryUsed: boolean;
}