import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../interfaces/cart.model';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = 'http://localhost:9000/api/cart/';

  constructor(private http: HttpClient) {}

  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    return of(cart);
    // return this.http.post<Cart>(this.baseURL, cart);
  }
  // READ
  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(this.baseURL + id);
  }
  getCartByUser_post(user: User): Observable<Cart[]> {
    return of([new Cart(0, 0)]);
    // return this.http.post<Cart[]>(this.baseURL, user);
  }
  // UPDATE
  updateCart(cart: Cart): Observable<Cart> {
    return of(cart);
    // return this.http.put<Cart>(this.baseURL, cart);
  }
  // DELETE
  deleteCart(cart: Cart): void {
    // this.http.delete(this.baseURL+cart.cartId);
  }
}
