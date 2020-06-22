export interface QuizSubmit {
  userScoreId: number;
  userEmail: string;
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
}
