import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';

fdescribe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
