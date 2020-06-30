import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../class/product/product';

@Injectable({
  providedIn: 'root'
})
export class ShareItemService {

  private shareSource = new BehaviorSubject(null);

  shareItems = this.shareSource.asObservable();
  cartList = [];

  constructor() { }

  addToCart(product: Product) {
    this.cartList.push(product);
    this.shareSource.next(this.cartList);
  }

}
