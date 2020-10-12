import { Questions } from './questions';
import { QuizSubmit } from './quizSubmit';

  
export interface Quiz {
  quizId: number;
  quizTopic: string;
  quizDescription: string;
  //Group 2 change
  quizTotalPoints: number;
  //Group 2 change
  quizDifficulty: string;
  creatorEmail: string;
  subjectId: number;
  subject: {
    subjectId: number;
    subjectName: string;
  };

  //Group 1 change (Oct.6)
  // attempts: QuizSubmit[];
}