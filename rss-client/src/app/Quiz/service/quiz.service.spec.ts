import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
