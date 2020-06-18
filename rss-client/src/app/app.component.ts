import { QuizService } from './services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private quizService: QuizService) {}
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
}
