import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInProgressComponent } from './test-in-progress.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizService } from 'src/app/services/quiz.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestInProgressComponent', () => {
  let component: TestInProgressComponent;
  let fixture: ComponentFixture<TestInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestInProgressComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [QuizService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
