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
    console.log(this.quiz.subject);
    return this.httpclient.post<any>(
      'http://localhost:8080/subject/add',
      this.quiz.subject
    );
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpclient.get<Subject[]>('http://localhost:8080/subject/all');
  }

  //Quiz Controller
  addQuiz(quiz): Observable<Quiz> {
    console.log(quiz);
    return this.httpclient.post<any>(
      'http://localhost:8080/quiz/addquiz',
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
  //this method is also going to be used to update questions aswell
  addSingularQuestion(question): Observable<Questions> {
    return this.httpclient.post<any>(
      'http://localhost:8080/question/add',
      question
    );
  }
  submitQuiz(quiz): Observable<any> {
    return this.httpclient.post<any>(
      'http://localhost:8080/question/submitquiz',
      quiz
    );
  }

  getQuestionsById(id): Observable<Questions[]> {
    this.questions.quizId = id;
    return this.httpclient.post<any[]>(
      'http://localhost:8080/question/getquestions',
      this.questions
    );
  }

  getQuestionsByIdAdmin(id): Observable<Questions[]> {
    this.questions.quizId = id;
    return this.httpclient.post<any[]>(
      'http://localhost:8080/question/getquestionsadmin',
      this.questions
    );
  }

  addManyQuestions(questions): Observable<Questions> {
    this.questions = questions;
    console.log(this.questions);
    return this.httpclient.post<any>(
      'http://localhost:8080/question/addall',
      this.questions
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

  deleteQuestion(id) {
    console.log(id);
    return this.httpclient.post<any[]>(
      'http://localhost:8080/question/delete',
      JSON.stringify(id),
      this.httpOptions
    );
  }
}
