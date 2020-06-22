export interface Quiz {
  quizId: number;
  quizTopic: string;
  quizDescription: string;
  creatorEmail: string;
  subjectId: number;
  subject: {
    subjectId: number;
    subjectName: string;
  };
}
