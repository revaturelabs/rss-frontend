import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}
  quizId: number;
  getSampleSubjects() {
    return ['subject 1', 'subject 2', 'subject 3'];
  }
  getSampleQuiz(id) {
    this.quizId = 1;
    if (this.quizId == id) {
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
            options: ['option 1', 'option 2', 'option 3', 'option 4'],
            pointValue: 2,
          },
          {
            questionId: 2,
            question: 'here is the second question',
            options: ['option 5', 'option 6', 'option 7', 'option 8'],
            pointValue: 2,
          },
          {
            questionId: 3,
            question: 'here is the third question',
            options: ['option 9', 'option 10', 'option 11', 'option 12'],
            pointValue: 2,
          },
          {
            questionId: 5,
            question: 'here is the fourth question',
            options: ['option 13', 'option 14', 'option 15', 'option 16'],
            pointValue: 2,
          },
        ],
        numberCorrect: 3,
        pointsAwarded: 2,
      };
    }
  }
}

//Eval team
//How are we storing picture data?

//Things that the backend should provide
//subjectPicture
//AvailablePoints from a specific quiz
//quizAttempts from userId and quizId

// What information would they like when we submit a test for eval?

//What we want
//what we need back
//numberCorrect
//pointsAwarded
