import { QuizPageService } from '../../service/quiz-page.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/User/services/image.service';
import { BreadcrumbService } from 'src/app/Common/services/breadcrumb.service';
import { AppComponent } from 'src/app/app.component';
import { QuizService } from '../../service/quiz.service';
import { UserService } from 'src/app/User/services/user.service';
import { User } from 'src/app/User/models/user';
import { AccountService } from 'src/app/User/services/account.service';
import { Account } from 'src/app/User/models/account';
import { subscribeOn } from 'rxjs/operators';
import { QuizSubmit } from '../../models/quizSubmit';
import { Quiz } from '../../models/quiz';
import { Questions } from '../../models/questions';

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  evalAccount: Account;
  user: User = this.userservice.userPersistance();
  quizzesTaken: any[] = [];
  questions: Questions[] = [];
  answers: any[];

  @Input() config;
  searchText: string;
  searchSubject: string;
  quizData;
  attempts: number[] =[]; 
  attempts2: QuizSubmit[];
  getValues: any;

  constructor(
    private quizservice: QuizService,
    private breadcrumbservice: BreadcrumbService,
    private parent: AppComponent,
    private userservice: UserService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.quizservice
    .getUserScores(this.user.email)
    .subscribe((res) => {
        this.quizzesTaken = res;
        const map = this.quizzesTaken.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        for(let x of map.values()){
          this.attempts.push(x);
        }
    });
    this.accountService.getAccountByUserId(this.user).subscribe((res) => {
      res.forEach((x) => {
        if (x.accTypeId == 2) {
          this.evalAccount = x;
        }
      });
    });
    this.quizservice.getUserScores(this.user.email).subscribe((res) => {
      if (res.length == 0) {
        this.quizzesTaken.push(0);
      } else {
        this.quizzesTaken = res;
      }
    });
    this.quizservice.getAllQuizzes().subscribe((res) => (this.quizData = res));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points', 'Quiz Overview'];
      this.parent.routerCrumbs = ['earnpoints', 'quizzes'];
    });
  }

  showReview(quizId) {

    const reviewElement = document.getElementById("review" + quizId);
    //if dropdown is already showing, hide it
    if (!reviewElement.classList.contains("hide")) {
      reviewElement.classList.add("hide");
    } else {
      const all: Element[] = Array.from(document.getElementsByClassName("small-text"));
      //close dropdown on all other quizzes
      for (let o of all) {
        if (!o.classList.contains("hide")) {
          o.classList.add("hide")
        }
      }
      console.log(quizId + " " + this.user.email);

      //show dropdown for chosen quiz
      reviewElement.classList.remove("hide");
      //make a request to get attempts for the quiz
      this.quizservice.getAttemptsByQuizId(quizId, this.user.email).subscribe(
        (data) => {
          console.log(data);
          this.attempts2 = data;
        }
      )
    }
  }

  getAttemptAnswers(attemptId) {
    //get answers by the attempt
    this.quizservice.getAnswersByAttemptId(attemptId).subscribe(
      (data) => {
        console.log(data);
        this.answers = data //array of answers -create class (AnswersBank)
      }
    )
  }

  //Selects the user-selected option from attempt
  isChecked(answer, option) {
    if (answer == option) {
      return true;
    } else {
      return false;
    }
  }

  isAnswer(answerKey, option) {
    if (answerKey == option) {
      return true;
    } else {
      return false;
    }
  }
}