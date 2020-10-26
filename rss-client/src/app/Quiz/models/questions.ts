export interface Questions {
  questionId: number;
  questionValue: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  correctAnswer: string;
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
