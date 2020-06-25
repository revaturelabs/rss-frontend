import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../interfaces/cart.model';
import { Observable, of, Subject } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { TempProducts } from '../Cart/temp_products';
import { CartItem } from '../interfaces/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = 'http://localhost:9000/api/cart/';
  private ActiveCart = new Subject<Cart>();

  constructor(private http: HttpClient) { }

  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    return of(cart);
    // return this.http.post<Cart>(this.baseURL, cart);
  }
  // READ
  getCartById(id: number): Observable<Cart> {
    let cart: Cart;
    if (id == 0) {
      cart = new Cart(0, 0, [], "Birthday");
      let cartItem: CartItem = new CartItem(1, cart, TempProducts[0].id, 5);
      cart.cartItems.push(cartItem);
    } else if (id == 1) {
      cart = new Cart(1, 0, [], "Christmas");
      let cartItem: CartItem = new CartItem(2, cart, TempProducts[1].id, 10);
      cart.cartItems.push(cartItem);
    } else if (id == 2) {
      cart = new Cart(2, 0, [], "Hanukkah");
      let cartItem: CartItem = new CartItem(3, cart, TempProducts[2].id, 1);
      cart.cartItems.push(cartItem);
    }
    return of(cart);
    // return this.http.get<Cart>(this.baseURL + id);
  }
  listCartsByUser(user: User): Observable<Cart[]> {
    let bdayCart: Cart = new Cart(0, 0, [], "Birthday");
    let bdayCartItem: CartItem = new CartItem(1, bdayCart, TempProducts[0].id, 5);
    bdayCart.cartItems.push(bdayCartItem);
    let xmasCart: Cart = new Cart(1, 0, [], "Christmas");
    let xmasCartItem: CartItem = new CartItem(2, xmasCart, TempProducts[1].id, 10);
    xmasCart.cartItems.push(xmasCartItem);
    let hnkaCart: Cart = new Cart(2, 0, [], "Hanukkah");
    let hnkaCartItem: CartItem = new CartItem(3, hnkaCart, TempProducts[2].id, 1);
    hnkaCart.cartItems.push(hnkaCartItem);
    return of([bdayCart, xmasCart, hnkaCart]);
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

  setActiveCart(cart: Cart): void {
    this.ActiveCart.next(cart);
  }

  getActiveCart(): Subject<Cart> {
    return this.ActiveCart;
  }

  isCartSelected(): boolean {
    let selected: boolean;
    this.ActiveCart.pipe(isEmpty()).subscribe(x => {
      selected = !x; console.log(!x);
    });

    return selected;
  }
}
