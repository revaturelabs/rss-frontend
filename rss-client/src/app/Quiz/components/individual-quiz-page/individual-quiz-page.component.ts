import { ImageService } from './../../../services/image.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { AppComponent } from 'src/app/app.component';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'individual-quiz-page',
  templateUrl: './individual-quiz-page.component.html',
  styleUrls: ['./individual-quiz-page.component.css'],
})
export class IndividualQuizPageComponent implements OnInit {
  @Input() config = {
    creatorEmail: '',
    quizDescription: '',
    quizId: 0,
    quizTopic: '',
    subject: { subjectId: 0, subjectName: '' },
    subjectId: 0,
    questions: [
      {
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        question: null,
        questionId: 0,
        questionValue: 0,
        selectedAnswer: null,
        userEmail: null,
      },
    ],
  };

  results: {
    totalQuestions: 0;
    correctAnswers: 0;
    totalPoints: 0;
  };

  retrieveQuizResolver;

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
    this.retrieveQuizPromise().then(() => {this.retrieveQuizQuestions()});
  }

  retrieveQuiz(): void {
    this.quizService
      .findQuizById(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.config = res;
      });
  }

  retrieveQuizQuestions(): void {
    this.quizService
      .getQuestionsById(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.config.questions = res;
      });
  }

  retrieveQuizPromise(): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveQuizResolver = resolve;
      this.retrieveQuiz();
    })
  }

  id = this.route.snapshot.params.id;
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = [
        'Earn Points',
        'Quiz Overview',
        new TitleCasePipe().transform(this.config.subject.subjectName) +
          ': ' +
          new TitleCasePipe().transform(this.config.quizTopic) +
          ' Quiz',
      ];
      this.parent.routerCrumbs = [
        'earnpoints',
        'quizzes',
        'quizzes/' + this.id,
      ];

    }, 2000);

  }
}
