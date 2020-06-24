import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CartItemService } from './cart-item.service';

fdescribe('CartItemService', () => {
  let service: CartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
