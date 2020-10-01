import { Injectable } from '@angular/core';
import { TestQuizPage } from './test-quiz-page-data';
@Injectable({
  providedIn: 'root',
})
export class QuizPageService {
  constructor() {}
  testquizpage: TestQuizPage[] = [
    {
      creatorEmail: 'a',
      id: 1,
      subject: 'Java',
      topic: 'Spring boot',
      description: 'nah',
    },
    {
      creatorEmail: 'b',
      id: 2,
      subject: 'SQL',
      topic: 'RDS',
      description: 'yah',
    },
    {
      creatorEmail: 'c',
      id: 3,
      subject: 'Angular',
      topic: 'IDK',
      description: 'la',
    },
    {
      creatorEmail: 'd',
      id: 4,
      subject: 'Java',
      topic: 'Servlets',
      description: 'di',
    },
    {
      creatorEmail: 'e',
      id: 5,
      subject: 'Angular',
      topic: 'Pipe it up',
      description: 'da',
    },
  ];
  getQuizData() {
    return this.testquizpage;
  }
}
