import { QuizService } from './services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { BreadcrumbService } from './services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User;
  isLoggedIn = false;

  breadcrumbs: any[] = [];
  routerCrumbs: any[] = [];
  subscription: Subscription;

  title = 'rss-client';
  headerConfig = {
    //put stuff in here coming a service/services for user info as well
    username: 'Brad Nelson Bingham',
  };

  quizPageConfig;
  quizConfig;
  rootPage = 'Home';

  constructor(
    private quizService: QuizService,
    private breadcrumbservice: BreadcrumbService
  ) {}

  ngOnInit(): void {
    // this.quizConfig = this.quizService.getSampleQuiz();
  }

  loginEvent(e) {
    this.user = e;
    console.log(this.user);
  }

  changeLoginStatus(status) {
    this.isLoggedIn = status;
    console.log(this.isLoggedIn);
  }

  onHome() {
    this.breadcrumbs = [];
    this.routerCrumbs = [];
  }
}
