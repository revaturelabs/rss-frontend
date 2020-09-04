import { TestBed } from '@angular/core/testing';

import { CheaterService } from './cheater.service';

describe('CheaterService', () => {
  let service: CheaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
