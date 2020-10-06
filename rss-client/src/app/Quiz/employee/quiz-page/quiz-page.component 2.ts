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

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  evalAccount: Account;
  user: User = this.userservice.userPersistance();
  quizzesTaken: any[] = [0];

  @Input() config;
  searchText: string;
  searchSubject: string;
  quizData;

  constructor(
    private quizservice: QuizService,
    private breadcrumbservice: BreadcrumbService,
    private parent: AppComponent,
    private userservice: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
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
}