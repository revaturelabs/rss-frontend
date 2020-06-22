
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = 'http://localhost:8989/';

  constructor(private http: HttpClient) {}

  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl + 'Cart', cart); // http://localhost:8989/Cart
  }

  // READ
  getAllCartsFromCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl + 'Cart'); // http://localhost:8989/Cart
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + 'Cart/' + id); // http://localhost:8989/Cart/{id}
  }

  // UPDATE
  public updateCart(cart: Cart) {
    return this.http.put<Cart>(this.baseUrl + 'Cart', cart); // http://localhost:8989/Cart
  }

  // DELETE
  deleteCartById(id: number): Observable<Cart> {
    return this.http.delete<Cart>(this.baseUrl + 'Cart/' + id); // http://localhost:8989/Cart/{id}
  }
}
