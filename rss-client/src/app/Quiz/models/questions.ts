import { Option } from './option';
import { Quiz } from './quiz';

export interface Questions {
  questionId: number;
  questionValue: number;
  question: string;
  options: Option[];
  quizId: number;
  quiz: {
    quizId: number;
    quizTopic: string;
    quizDescription: string;
    creatorEmail: string;
    subjectId: number;
    subject: {
      subjectId: number;
      subjectName: string;
    };
  };
}
