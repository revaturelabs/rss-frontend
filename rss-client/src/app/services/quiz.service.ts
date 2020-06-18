import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}
  getSampleQuiz() {
    return {
      quizId: 1,
      creatorEmail: 'email@email.com',
      subject: 'Java',
      topic: 'Spring',
      subjectPicture: null,
      description: 'A quiz about Java Spring',
      instructions: [
        'When taking the quiz you will be able to see how much time you have remaining ',
        '	When you have completed the quiz click finish button to record your answers',
        'You will receive marks on completion of the quiz',
      ],
      availablePoints: 10,
      quizAttempts: 1,
      questions: [
        {
          questionId: 1,
          question: 'here is the first question',
          value: '1',
          options: ['option 1', 'option 2', 'option 3', 'option 4'],
        },
        {
          questionId: 2,
          question: 'here is the second question',
          value: '1',
          options: ['option 5', 'option 6', 'option 7', 'option 8'],
        },
        {
          questionId: 3,
          question: 'here is the third question',
          value: '1',
          options: ['option 9', 'option 10', 'option 11', 'option 12'],
        },
        {
          questionId: 5,
          question: 'here is the fourth question',
          value: '1',
          options: ['option 13', 'option 14', 'option 15', 'option 16'],
        },
      ],
      numberCorrect: 3,
      pointsAwarded: 2,
    };
  }
}
