import { QuizService } from './services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  breadcrumbs: any[] = [];
  subscription: Subscription;
  constructor(
    private quizService: QuizService,
    private breadcrumbservice: BreadcrumbService
  ) {}
  ngOnInit(): void {
    // this.quizConfig = this.quizService.getSampleQuiz();

    this.subscription = this.breadcrumbservice
      .getBreadCrumb()
      .subscribe((breadcrumb) => {
        if (breadcrumb) {
          console.log(breadcrumb);
          breadcrumb.breadcrumb.forEach((x) => {
            this.breadcrumbs.push(x);
          });
          console.log(this.breadcrumbs);
        } else {
          this.breadcrumbs = [];
        }
      });
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
