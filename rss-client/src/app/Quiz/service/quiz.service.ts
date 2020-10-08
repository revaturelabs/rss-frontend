import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { QuizSubmit } from '../models/quizSubmit';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/User/models/user';
import { AccountService } from 'src/app/User/services/account.service';
import { Account } from 'src/app/User/models/account';

@Injectable({
  providedIn: 'root',
})
export class QuizService {

  url = `${environment.evaluationServiceUrlWithZuul}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  quiz: Quiz = {
    quizId: 0,
    quizTopic: '',
    quizDescription: '',
    quizTotalPoints:0,
    quizDifficulty: '',
    quizAttempt: 0,
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
    //Group 1 change (Oct.6)
    status: '',
    answers: []
  };

  constructor(private httpclient: HttpClient, private accountService: AccountService) { }

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
  //this method is also going to be used to update questions as well
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



  //UserQuizScore Controller
  getUserScores(email): Observable<any[]> {
    this.quizSubmit.userEmail = email;
    return this.httpclient.post<any>(
      this.url + '/userscore/obtain/taken',
      this.quizSubmit
    );
  }

  //sends request to UserQuizScoreController - create this method +useremail
  getAttemptsByQuizId(quizId) {
    return this.httpclient.get<QuizSubmit[]>(this.url + '/userscore/quiz/'+quizId);
  }

  //sends request to AnswersBankController - create this method based on userscoreid
  getAnswersByAttemptId(id) {
    return this.httpclient.get<any[]>(this.url+'/answer/'+id);
  }

  //userId: User;
  // accId: Account;
 // quizId: Quiz;
  // userScoreId: number;

  //subtracting away attempts
  subtractAttempt(attempt) {
    this.quiz.quizAttempt = attempt;
    if(attempt > 0) {
      --attempt;
      this.updateQuizAttempt(this.quizSubmit.userScoreId);
    } 
    console.log("ATTEMPT: ", attempt);
    return attempt;
  }
  //GROUP 2 - need updating method...user or account?
  updateQuizAttempt(userScoreId): Observable<QuizSubmit> {
    return this.httpclient.put<any>(this.url + '/userscore/quizzes', userScoreId);
  }

}

