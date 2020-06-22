import { QuizService } from './services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User;
  isLoggedIn = false;


  constructor(private quizService: QuizService) { }
  ngOnInit(): void {
    // this.quizConfig = this.quizService.getSampleQuiz();
  }
  title = 'rss-client';
  headerConfig = {
    //put stuff in here coming a service/services for user info as well
    username: 'Brad Nelson Bingham',
  };
  rootConfig = {
    userType: 'Employee', //take this info from a service gathering the user info
  };
  quizPageConfig;
  quizConfig;
  rootPage = 'Home';
  breadCrumbs = ['a', 'b', 'c']; //bradcrumbs


  loginEvent(e) {
    this.user = e;
    console.log(this.user);
  }

  changeLoginStatus(user) {
    if (user != null) {
      this.isLoggedIn = false;
    }
    console.log(this.isLoggedIn)
  }
}


