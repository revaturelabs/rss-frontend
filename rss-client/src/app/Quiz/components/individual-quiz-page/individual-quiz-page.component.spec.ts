import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualQuizPageComponent } from './individual-quiz-page.component';

describe('IndividualQuizPageComponent', () => {
  let component: IndividualQuizPageComponent;
  let fixture: ComponentFixture<IndividualQuizPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualQuizPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
