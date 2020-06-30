import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CartItemService } from './cart-item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('CartItemService', () => {
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
