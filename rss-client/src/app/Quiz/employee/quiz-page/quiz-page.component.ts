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

  //GROUP 2
  attempts: number[] =[]; 
  getValues: any;

  constructor(
    private quizservice: QuizService,
    private breadcrumbservice: BreadcrumbService,
    private parent: AppComponent,
    private userservice: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    //GROUP 2 CHANGE
    this.quizservice
    .getUserScores(this.user.email)
    .subscribe((res) => {
        this.quizzesTaken = res;
        console.log(this.quizzesTaken);
        const map = this.quizzesTaken.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        console.log(map.values());
        console.log(map.keys()); 
        console.log(this.attempts); 
        for(let x of map.values()){
          this.attempts.push(x);
        }
        console.log(this.attempts);
    });
    console.log(this.attempts);
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
    this.quizservice.getAllQuizzes().subscribe((res) =>(this.quizData = res));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points', 'Quiz Overview'];
      this.parent.routerCrumbs = ['earnpoints', 'quizzes'];
    });
  }

  showReview(quizId) {
    const reviewElement = document.getElementById("review" + quizId);
    if (reviewElement.classList.contains("hide")) {
      reviewElement.classList.remove("hide");
    } else {
      reviewElement.classList.add("hide");
    }
  }

  getQuestions(quizId) {
    this.quizservice.getQuestionsById(quizId).subscribe(
      (data) => (
        this.questions = data
      )
    )
  }

}