import { TestBed } from '@angular/core/testing';

import { FakeProductsService } from './fake-products.service';

describe('FakeProductsService', () => {
  let service: FakeProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
