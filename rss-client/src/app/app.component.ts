import { QuizService } from './services/quiz.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from './interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from './User/user/services/user.service';
import { CheaterService } from './services/cheater.service';

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
  headerConfig = {};

  // quizPageConfig;
  // quizConfig;
  rootPage = 'Home';
  mouseOut: boolean;
  fakeUser;
  constructor(
    private quizService: QuizService,
    private userservice: UserService,
  ) {
    this.user = this.userservice.getCurrentUser();
    this.fakeUser = this.userservice.userPersistance();
    if (this.fakeUser != undefined) {
      this.user = this.fakeUser;
      this.isLoggedIn = true;
    }
    // if (this.user) {
    //   this.isLoggedIn = true
    // }
   }


  ngOnInit(): void {
  }

  loginEvent(e) {
    this.user = e;
  }

  changeLoginStatus(status) {
    this.isLoggedIn = status;
  }

  onHome() {
    this.breadcrumbs = [];
    this.routerCrumbs = [];
  }
}
