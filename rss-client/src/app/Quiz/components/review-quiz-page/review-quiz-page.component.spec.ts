import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQuizPageComponent } from './review-quiz-page.component';

describe('ReviewQuizPageComponent', () => {
  let component: ReviewQuizPageComponent;
  let fixture: ComponentFixture<ReviewQuizPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewQuizPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
