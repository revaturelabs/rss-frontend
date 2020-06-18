import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css'],
})
export class PostTestComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  onRetake() {
    this.pushProgress.emit('pre-test');
  }
  onBack() {
    //TODO: Navigate back to quiz summary page
  }
  constructor() {}
  ngOnInit(): void {}
}
