  
export interface Quiz {
  quizId: number;
  quizTopic: string;
  quizDescription: string;
  //Group 2 change
  quizTotalPoints: number;
  //Group 2 change
  quizDifficulty: string;
  quizAttempt: number;
  creatorEmail: string;
  subjectId: number;
  subject: {
    subjectId: number;
    subjectName: string;
  };
}
