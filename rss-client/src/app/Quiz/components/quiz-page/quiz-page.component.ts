import { QuizPageService } from 'src/app/Test/Quiz/quiz-page.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { AppComponent } from 'src/app/app.component';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/interfaces/account';

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  evalAccount: Account;
  user: User = this.userservice.userPersistance();

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
    this.quizservice.getAllQuizzes().subscribe((res) => (this.quizData = res));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points', 'Quiz Overview'];
      this.parent.routerCrumbs = ['earnpoints', 'quizzes'];
    });
  }
}
