import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuesitonComponent } from './quiz-quesiton.component';

describe('QuizQuesitonComponent', () => {
  let component: QuizQuesitonComponent;
  let fixture: ComponentFixture<QuizQuesitonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizQuesitonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuesitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
