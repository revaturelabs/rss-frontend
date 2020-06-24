import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../interfaces/subject';
import { Quiz } from '../interfaces/quiz';
import { Questions } from '../interfaces/questions';
import { QuizSubmit } from '../interfaces/quizSubmit';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quiz: Quiz = {
    quizId: 0,
    quizTopic: '',
    quizDescription: '',
    creatorEmail: '',
    subjectId: 0,
    subject: {
      subjectId: 0,
      subjectName: '',
    },
  };
  questions: Questions = {
    questionId: 0,
    questionValue: 0,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    correctAnswer: '',
    quizId: 0,
    quiz: {
      quizId: 0,
      quizTopic: '',
      quizDescription: '',
      creatorEmail: '',
      subjectId: 0,
      subject: {
        subjectId: 0,
        subjectName: '',
      },
    },
  };

  quizSubmit: QuizSubmit = {
    userScoreId: 0,
    userEmail: '',
    userId: 0,
    userScore: 0,
    submitDate: '',
    quizId: 0,
    quiz: {
      quizId: 0,
      quizTopic: '',
      quizDescription: '',
      creatorEmail: '',
      subject: {
        subjectId: 0,
        subjectName: '',
      },
    },
  };

  constructor(private httpclient: HttpClient) {}

  //Subject-Controller
  addSubject(sub): Observable<Subject> {
    return this.httpclient.post<any>('http://localhost:8080/subject/add', sub);
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpclient.get<Subject[]>('http://localhost:8080/subject/all');
  }

  //Quiz Controller
  addQuiz(quiz): Observable<Quiz> {
    return this.httpclient.post<any>(
      'http://localhost:8080/quiz/addquiz',
      quiz
    );
  }

  submitQuiz(quiz): Observable<Quiz> {
    return this.httpclient.post<any>(
      'http://localhost:8080/quiz/findbyid',
      quiz
    );
  }

  findQuizById(id): Observable<Quiz> {
    this.quiz.quizId = id;
    return this.httpclient.post<any>(
      'http://localhost:8080/quiz/findbyid',
      this.quiz
    );
  }

  findQuizBySubject(id): Observable<Quiz> {
    this.quiz.subjectId = id;
    return this.httpclient.post<any>(
      'http://localhost:8080/quiz/findbysubject',
      this.quiz.subjectId
    );
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.httpclient.get<Quiz[]>(
      'http://localhost:8080/quiz/getallquizzes'
    );
  }

  //Questions Bank Controller
  addSingularQuestion(question): Observable<Questions> {
    return this.httpclient.post<any>(
      'http://localhost:8080/question/add',
      question
    );
  }

  getQuestionsById(id): Observable<Questions> {
    this.questions.quizId = id;
    return this.httpclient.post<any>(
      'http://localhost:8080/question/getquestions',
      this.questions
    );
  }

  addManyQuestions(questions): Observable<Questions> {
    return this.httpclient.post<any>(
      'http://localhost:8080/question/addall',
      questions
    );
  }

  //User Quiz Score Controller
  getUserScores(email): Observable<QuizSubmit> {
    this.quizSubmit.userEmail = email;
    return this.httpclient.post<any>(
      'http://localhost:8080/userscore/takenquiz',
      this.quizSubmit
    );
  }
  // quizId: number;
  // getSampleSubjects() {
  //   return ['subject 1', 'subject 2', 'subject 3'];
  // }

  // getSampleQuiz(id) {
  //   this.quizId = 1;
  //   if (this.quizId == id) {
  //     return {
  //       quizId: 1,
  //       creatorEmail: 'email@email.com',
  //       subject: 'Java',
  //       topic: 'Spring',
  //       subjectPicture: null,
  //       description: 'A quiz about Java Spring',
  //       instructions: [
  //         'When taking the quiz you will be able to see how much time you have remaining ',
  //         '	When you have completed the quiz click finish button to record your answers',
  //         'You will receive marks on completion of the quiz',
  //       ],
  //       availablePoints: 10,
  //       quizAttempts: 1,
  //       questions: [
  //         {
  //           questionId: 1,
  //           question: 'here is the first question',
  //           options: ['option 1', 'option 2', 'option 3', 'option 4'],
  //         },
  //         {
  //           questionId: 2,
  //           question: 'here is the second question',
  //           options: ['option 5', 'option 6', 'option 7', 'option 8'],
  //         },
  //         {
  //           questionId: 3,
  //           question: 'here is the third question',
  //           options: ['option 9', 'option 10', 'option 11', 'option 12'],
  //         },
  //         {
  //           questionId: 5,
  //           question: 'here is the fourth question',
  //           options: ['option 13', 'option 14', 'option 15', 'option 16'],
  //         },
  //       ],
  //       numberCorrect: 3,
  //       pointsAwarded: 2,
  //     };
  //   }
  // }
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
