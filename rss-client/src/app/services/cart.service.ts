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
  private baseURL = 'http://localhost:9999/cart/';
  private baseURLplural = 'http://localhost:9999/carts/';
  private ActiveCart = new Subject<Cart>();
  private mockData: Cart[] = [];

  constructor(private http: HttpClient) {
    this.generateMockData();
  }

  // temporary data until we get endpoints
  generateMockData(): void {
    let bdayCart: Cart = new Cart(0, 0, "Birthday", []);
    let bdayCartItem: CartItem = new CartItem(1, TempProducts[0].id, 5);
    bdayCart.cartItems.push(bdayCartItem);
    let xmasCart: Cart = new Cart(1, 0, "Christmas", []);
    let xmasCartItem: CartItem = new CartItem(2, TempProducts[1].id, 10);
    xmasCart.cartItems.push(xmasCartItem);
    let hnkaCart: Cart = new Cart(2, 0, "Hanukkah", []);
    let hnkaCartItem: CartItem = new CartItem(3, TempProducts[2].id, 1);
    hnkaCart.cartItems.push(hnkaCartItem);
    this.mockData = [bdayCart, xmasCart, hnkaCart];
  }

  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    // return of(cart);
    cart.cartItems = [];
    return this.http.post<Cart>(this.baseURL, cart);
  }
  // READ
  // getCartById(id: number): Observable<Cart> {
  //   let cart: Cart;
  //   if (id == 0) {
  //     cart = new Cart(0, 0, "Birthday", []);
  //     let cartItem: CartItem = new CartItem(1, TempProducts[0].id, 5);
  //     cart.cartItems.push(cartItem);
  //   } else if (id == 1) {
  //     cart = new Cart(1, 0, "Christmas", []);
  //     let cartItem: CartItem = new CartItem(2, TempProducts[1].id, 10);
  //     cart.cartItems.push(cartItem);
  //   } else if (id == 2) {
  //     cart = new Cart(2, 0, "Hanukkah", []);
  //     let cartItem: CartItem = new CartItem(3, TempProducts[2].id, 1);
  //     cart.cartItems.push(cartItem);
  //   }
  //   return of(cart);
  // }

  getCartById(id: number): Observable<any> {
    if (id == 0 && sessionStorage.getItem("defaultCart")) {
      return of(JSON.parse(sessionStorage.getItem("defaultCart")))
      // } else if (id == 0) {
      //   let defaultCart = new Cart(0, userId, "(default)", []);
      //   sessionStorage.setItem("defaultcart", JSON.stringify(defaultCart));
      //   return of(defaultCart);
    } else {
      return this.http.get(this.baseURL + id);
    }
  }

  listCartsByUser(user: User): Observable<Cart[]> {
    // return of(this.mockData);
    let userCarts: Cart[];
    if (sessionStorage.getItem("defaultCart")) {
      userCarts = [JSON.parse(sessionStorage.getItem("defaultCart"))];
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
        console.log(carts);
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
