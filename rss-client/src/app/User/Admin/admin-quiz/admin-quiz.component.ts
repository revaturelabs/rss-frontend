import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.scss'],
})
export class AdminQuizComponent implements OnInit {
  @Output() navigateEvent = new EventEmitter();
  navigateBack() {
    this.navigateEvent.emit('');
  }

  constructor(private parent: AppComponent) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Admin'];
      this.parent.routerCrumbs = ['admin'];
    });
  }
}
