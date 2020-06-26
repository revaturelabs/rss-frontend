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
    return of(cart);
    // return this.http.post<Cart>(this.baseURL, cart);
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
    return this.http.get(this.baseURL + id);
  }

  listCartsByUser(user: User): Observable<Cart[]> {
    // return of(this.mockData);
    let userCarts: Cart[];
    if (sessionStorage.getItem("defaultCart")) {
      userCarts = [JSON.parse(sessionStorage.getItem("defaultCart"))];
    } else {
      userCarts = [new Cart(0, user.userId, "(default)", [])];
    }
    if (!JSON.parse(sessionStorage.getItem("activecartId"))) {
      sessionStorage.setItem("activecartId", `${userCarts[0].cartId}`);
    }
    // if (!sessionStorage.getItem("activecartId")) {
    //   this.setActiveCart(userCarts[0]);
    // }
    // console.log(sessionStorage.getItem('defaultCart'))
    // if (!sessionStorage.getItem("defaultCart")) {
    //   sessionStorage.setItem('defaultCart', JSON.stringify(userCarts[0]));
    // }
    this.http.get<Cart[]>(this.baseURLplural + user.userId).subscribe(
      carts => {
        console.log(carts);
        if (carts) {
          for (let cart of carts) {
            userCarts.push(cart);
          }
        }
      })

    // user.userCartIds = [];
    // for (let cart of userCarts) {
    //   user.userCartIds.push(cart.cartId);
    // }

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
    this.http.delete(this.baseURL + 127).subscribe();
    // this.http.delete(this.baseURL+115, {observe: 'response'})
    //   .subscribe(response => {
    //     console.log(response.status);
    //   })
    return true;

    // let index = this.mockData.indexOf(cart);
    // // splice out this cart from the user's cart array
    // if (index > -1) {
    //   this.mockData.splice(index, 1);
    //   return true;
    // } else {
    //   return false;
    // }
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
