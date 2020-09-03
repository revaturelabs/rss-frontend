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
 // url = 'http://localhost:8080';
  url = 'http://ec2-34-203-75-254.compute-1.amazonaws.com:10000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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
    this.quiz.subject.subjectName = sub;
    return this.httpclient.post<any>(
      this.url + '/subject/admin/add',
      this.quiz.subject
    );
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpclient.get<Subject[]>(this.url + '/subject/obtain/all');
  }

  //Quiz Controller
  addQuiz(quiz): Observable<Quiz> {
    return this.httpclient.post<any>(this.url + '/quiz/admin/add', quiz);
  }

  findQuizById(id): Observable<any> {
    let input = {
      quizId: id,
    };
    return this.httpclient.post<any>(this.url + '/quiz/obtain/id', input);
  }

  findQuizBySubject(id): Observable<any> {
    this.quiz.subjectId = id;
    return this.httpclient.post<any>(
      this.url + '/quiz/obtain/subject',
      this.quiz.subjectId
    );
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.httpclient.get<Quiz[]>(this.url + '/quiz/obtain/all');
  }

  //Questions Bank Controller
  //this method is also going to be used to update questions aswell
  addSingularQuestion(question): Observable<Questions> {
    return this.httpclient.post<any>(
      this.url + '/question/admin/add',
      question
    );
  }
  submitQuiz(quiz): Observable<any> {
    return this.httpclient.post<any>(this.url + '/question/forward', quiz);
  }


  getQuestionsById(id): Observable<any[]> {

    let input = {
      quizId: id,
    };
    return this.httpclient.post<any[]>(this.url + '/question/questions', input);
  }

  getQuestionsByIdAdmin(id): Observable<Questions[]> {
    let input = {
      quizId: id,
    };
    return this.httpclient.post<any[]>(
      this.url + '/question/admin/questions',
      input
    );
  }

  addManyQuestions(questions): Observable<Questions> {
    this.questions = questions;
    return this.httpclient.post<any>(
      this.url + '/question/admin/addall',
      this.questions
    );
  }
  deleteQuestion(id) {
    return this.httpclient.post<any[]>(
      this.url + '/question/admin/delete',
      JSON.stringify(id),
      this.httpOptions
    );
  }

  //User Quiz Score Controller
  getUserScores(email): Observable<any[]> {
    this.quizSubmit.userEmail = email;
    return this.httpclient.post<any>(
      this.url + '/userscore/obtain/taken',
      this.quizSubmit
    );
  }
}
