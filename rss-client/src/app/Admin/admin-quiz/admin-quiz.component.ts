import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.css'],
})
export class AdminQuizComponent implements OnInit {
  @Output() navigateEvent = new EventEmitter();
  navigateBack() {
    this.navigateEvent.emit('');
  }

  constructor() {}
  ngOnInit(): void {}
}
