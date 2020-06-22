import { CartItem } from './cart-item.model';

export class Cart {
  cartId: number;
  userId: number;
  cartItems: CartItem[];

  constructor(cartId?: number, userId?: number, cartItems?: CartItem[]) {
    this.cartId = cartId;
    this.userId = userId;
    this.cartItems = cartItems;
  }
}
