import { Questions } from './questions';
import { QuizSubmit } from './quizSubmit';

  
export interface Quiz {
  quizId: number;
  quizTopic: string;
  quizDescription: string;
  quizTotalPoints: number;
  quizDifficulty: string;
  creatorEmail: string;
  subjectId: number;
  subject: {
    subjectId: number;
    subjectName: string;
  };
}