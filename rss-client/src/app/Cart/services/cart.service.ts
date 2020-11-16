import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { Observable, of, Subject } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { User } from 'src/app/User/models/user';
import { CartItem } from '../models/cart-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL = `${environment.cartServiceUrl}/cart/`;
  baseURLplural = `${environment.cartServiceUrl}/carts/`;
  private ActiveCart = new Subject<Cart>();

  constructor(private http: HttpClient) { }

  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    // return of(cart);
    cart.cartItems = [];
    return this.http.post<Cart>(this.baseURL, cart);
  }

  // READ
  getCartById(id: number): Observable<any> {
    if (id == 0 && sessionStorage.getItem("defaultcart")) {
      return of(JSON.parse(sessionStorage.getItem("defaultcart")))
    } else {
      return this.http.get(this.baseURL + id);
    }
  }

  listCartsByUser(user: User): Observable<Cart[]> {
    // return of(this.mockData);
    let userCarts: Cart[];
    if (sessionStorage.getItem("defaultcart")) {
      userCarts = [JSON.parse(sessionStorage.getItem("defaultcart"))];
    } else {
      userCarts = [new Cart(0, user.userId, "(default)", [])];
      sessionStorage.setItem("defaultcart", JSON.stringify(userCarts[0]));
    }
    if (!JSON.parse(sessionStorage.getItem("activecartId"))) {
      sessionStorage.setItem("activecartId", `${userCarts[0].cartId}`);
      sessionStorage.setItem("myactivecart", JSON.stringify(userCarts[0]));
    }
    this.http.get<Cart[]>(this.baseURLplural + user.userId).subscribe(
      carts => {
        // console.log(carts);
        if (carts) {
          for (let cart of carts) {
            userCarts.push(cart);
          }
        }
      })

    return of(userCarts);
  }

  // UPDATE
  updateCart(cart: Cart): Observable<Cart> {
    return of(cart);
    // return this.http.put<Cart>(this.baseURL, cart);
  }
  // DELETE
  deleteCart(cart: Cart): boolean {
    // return this.http.delete(this.baseURL + 127);
    // this.http.delete(this.baseURL + cart.cartId).subscribe();
    let deleted: boolean = false;
    this.http.delete(this.baseURL + cart.cartId, { observe: 'response' })
      .subscribe(response => {
        console.log(response.status);
        if ([200, 201, 202].includes(response.status)) {
          deleted = true;
        }
      })
    return deleted;
  }

  // deleteCartWithId(cartId: number): boolean {
  //   let deleted: boolean = false;
  //   this.http.delete(this.baseURL + cartId, { observe: 'response' })
  //     .subscribe(response => {
  //       console.log(response.status);
  //       if ([200, 201, 202].includes(response.status)) {
  //         deleted = true;
  //       }
  //     })
  //   return deleted;
  // }

  deleteCartWithId(cartId: number): Observable<any> {
    return this.http.delete(this.baseURL + cartId, { observe: 'response' })
  }

  setActiveCart(cart: Cart): void {
    // this.ActiveCart.next(cart);
    sessionStorage.setItem('activecartId', JSON.stringify(cart.cartId));
  }

  getActiveCart(): Cart {
    // return this.ActiveCart;
    return JSON.parse(sessionStorage.getItem('activeCart'));
  }

  isCartSelected(): boolean {
    let selected: boolean;
    this.ActiveCart.pipe(isEmpty()).subscribe(x => {
      selected = !x; console.log(!x);
    });

    return selected;
  }
}
