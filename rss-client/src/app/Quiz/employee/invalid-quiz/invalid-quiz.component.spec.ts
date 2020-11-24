import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidQuizComponent } from './invalid-quiz.component';
import { CheaterService } from 'src/app/Quiz/service/cheater.service';

describe('InvalidQuizComponent', () => {
  let component: InvalidQuizComponent;
  let fixture: ComponentFixture<InvalidQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidQuizComponent ],
      imports: [],
      providers: [
        CheaterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
