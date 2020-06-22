import { QuizPageService } from 'src/app/Test/Quiz/quiz-page.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  @Input() config;
  searchText: string;
  searchSubject: string;
  quizData;

  constructor(
    private testservice: QuizPageService,
    private breadcrumbservice: BreadcrumbService,
    private parent: AppComponent
  ) {
    this.quizData = this.testservice.getQuizData();
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points', 'Quiz Overview'];
      this.parent.routerCrumbs = ['earnpoints', 'quizzes'];
    });
  }
}
