import { TestBed } from '@angular/core/testing';

import { QuizPageService } from './quiz-page.service';

describe('QuizPageService', () => {
  let service: QuizPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
