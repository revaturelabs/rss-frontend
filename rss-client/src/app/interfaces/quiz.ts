export interface Quiz {
  quizId: number;
  quizTopic: string;
  quizDescription: string;
  //Group 2 change
  quizTotalPoints: number;
  creatorEmail: string;
  subjectId: number;
  subject: {
    subjectId: number;
    subjectName: string;
  };
}
