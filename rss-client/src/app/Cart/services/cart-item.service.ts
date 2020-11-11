import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  baseURL = `${environment.cartServiceUrl}/cartitem/`;

  constructor(private http: HttpClient) { }

  // CREATE
  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseURL, cartItem);
  }
  // READ
  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(this.baseURL + id);
  }
  listCartItemsByCart(cart: Cart): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(this.baseURL, cart);
  }
  // UPDATE
  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.baseURL, cartItem);
  }
  // DELETE
  deleteCartItem(cartItem: CartItem): Observable<any> {
    return this.http.delete(this.baseURL + cartItem.cartItemId);
  }
}
