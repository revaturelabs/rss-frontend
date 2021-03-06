import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndividualQuizPageComponent } from '../individual-quiz-page/individual-quiz-page.component';
import { QuizService } from '../../service/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.scss'],
})
export class PostTestComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  onRetake() {
    this.pushProgress.emit('pre-test');
  }
  onBack() {
    
  }
  constructor(public parentalunit: IndividualQuizPageComponent, public quizservice: QuizService) {}
  ngOnInit(): void {}
}
