import { CartItem } from '../Interfaces/cart-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  baseUrl: string = 'http://localhost:8989/';

  constructor(private http: HttpClient) {}

  // CREATE
  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl + 'CartItem', cartItem); // http://localhost:8989/CartItem
  }

  // READ
  getAllCartItemsFromCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl + 'CartItem'); // http://localhost:8989/CartItem
  }

  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(this.baseUrl + 'CartItem/' + id); // http://localhost:8989/CartItem/{id}
  }

  // UPDATE
  public updateCartItem(cartItem: CartItem) {
    return this.http.put<CartItem>(this.baseUrl + 'CartItem', cartItem); // http://localhost:8989/CartItem
  }

  // DELETE
  deleteCartItemById(id: number): Observable<CartItem> {
    return this.http.delete<CartItem>(this.baseUrl + 'CartItem/' + id); // http://localhost:8989/CartItem/{id}
  }
}
