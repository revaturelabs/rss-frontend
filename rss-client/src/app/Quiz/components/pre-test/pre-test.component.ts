import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.css'],
})
export class PreTestComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  questions;

  onEvent() {
    this.pushProgress.emit('in-progress');
  }

  constructor() {}

  ngOnInit(): void {
    //why does config not work on this page???
  }
}
