import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';
import { IndividualQuizPageComponent } from '../individual-quiz-page/individual-quiz-page.component';

@Component({
  selector: 'pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
})
export class PreTestComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  questions;

  onEvent() {
    this.pushProgress.emit('in-progress');
  }

  constructor() {}

  ngOnInit(): void {}
}
