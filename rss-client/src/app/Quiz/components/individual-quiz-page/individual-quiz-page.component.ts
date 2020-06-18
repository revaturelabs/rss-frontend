import { ImageService } from './../../../services/image.service';
import { Component, OnInit, Input } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
