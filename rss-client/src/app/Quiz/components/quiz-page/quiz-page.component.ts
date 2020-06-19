import { QuizPageService } from 'src/app/Test/Quiz/quiz-page.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  @Input() config;
  searchText: string;
  quizData;

  constructor(
    private testservice: QuizPageService,
    private breadcrumbservice: BreadcrumbService
  ) {
    this.quizData = this.testservice.getQuizData();
  }

  ngOnInit(): void {
    this.breadcrumbservice.clearBreadCrumb();
    this.breadcrumbservice.sendBreadCrumb(['Earn Points', 'Quiz Overview']);
  }
}
