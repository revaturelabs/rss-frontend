import { Questions } from './questions';

export interface QuizSubmit {
  userScoreId: number;
  userEmail: string;
  userId: number;
  userScore: 0;
  submitDate: string;
  quizId: number;
  quiz: {
    quizId: number;
    quizTopic: string;
    quizDescription: string;
    creatorEmail: string;
    subject: {
      subjectId: number;
      subjectName: string;
    };
  };

  //Group 1 change (Oct.6)
  status: String;
  questions: Questions[];
}
