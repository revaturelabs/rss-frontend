import { TestBed } from '@angular/core/testing';

import { CartItemService } from './cart-item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CartItemService', () => {
  let service: CartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [CartItemService],
    });
    service = TestBed.inject(CartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
