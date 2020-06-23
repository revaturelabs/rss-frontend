import { Injectable } from '@angular/core';
import { TempProducts } from './temp_products';
import { Observable, of } from 'rxjs';
import { TempProduct } from './temp-product';

@Injectable({
  providedIn: 'root'
})
export class FakeProductsService {

  constructor() { }
    // this function is going to access TempProducts
  // and find the product that matches the Id that was passed in
  // and return an observable 'of' the result
  getProductById(id: number): Observable<TempProduct> {
    let result = TempProducts.find(product => product.id == id)
    return of(result);
  }

}
