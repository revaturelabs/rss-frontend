import { Injectable } from '@angular/core';
import { TestQuizPage } from './test-quiz-page-data';
@Injectable({
  providedIn: 'root',
})
export class QuizPageService {
  constructor() {}
  testquizpage: TestQuizPage[] = [
    { id: 1, quizName: 'Java', description: 'nah' },
    { id: 2, quizName: 'SQL', description: 'yah' },
    { id: 3, quizName: 'Java-servlets', description: 'la' },
    { id: 4, quizName: 'Spring', description: 'di' },
    { id: 5, quizName: 'Angular', description: 'da' },
  ];
  getQuizData() {
    return this.testquizpage;
  }
}
