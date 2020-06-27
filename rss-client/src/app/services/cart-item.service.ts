import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../interfaces/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  baseURL: string = 'http://localhost:9999/cartitem/';

  constructor(private http: HttpClient) { }

  // CREATE
  addCartItem(cartItem: CartItem): Observable<CartItem> {
    // return of(cartItem);
    return this.http.post<CartItem>(this.baseURL, cartItem);
  }
  // READ
  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(this.baseURL + id);
  }
  listCartItemsByCart(cart: Cart): Observable<CartItem[]> {
    // return of([new CartItem(0, 0, 1)]);
    return this.http.post<CartItem[]>(this.baseURL, cart);
  }
  // UPDATE
  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    // return of(cartItem);
    return this.http.put<CartItem>(this.baseURL, cartItem);
  }
  // DELETE
  deleteCartItem(cartItem: CartItem): Observable<any> {
    return this.http.delete(this.baseURL + cartItem.cartItemId);
  }
}
