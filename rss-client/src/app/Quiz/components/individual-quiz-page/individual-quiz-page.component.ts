import { ImageService } from './../../../services/image.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'individual-quiz-page',
  templateUrl: './individual-quiz-page.component.html',
  styleUrls: ['./individual-quiz-page.component.css'],
})
export class IndividualQuizPageComponent implements OnInit {
  @Input() config;

  subjectPicture;
  instructions = [];
  //options are pre-test, in-progress, post-test
  testProgress = 'pre-test';
  updateprogress(status) {
    this.testProgress = status;
  }
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private parent: AppComponent
  ) {}

  ngOnInit(): void {
    //this pulls in the id passed from the quiz-page
    this.config = this.quizService.getSampleQuiz(this.route.snapshot.params.id);
  }

  id = this.route.snapshot.params.id;
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points', 'Quiz Overview', 'hi'];
      this.parent.routerCrumbs = [
        'earnpoints',
        'quizzes',
        'quizzes/' + this.id,
      ];
    });
  }
}
