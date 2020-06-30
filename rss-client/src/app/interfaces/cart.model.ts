import { CartItem } from './cart-item.model';

export class Cart {
  cartId: number;
  userId: number;
  name: string;
  cartItems: CartItem[];

  constructor(cartId?: number, userId?: number, name?: string, cartItems?: CartItem[]) {
    this.cartId = cartId;
    this.userId = userId;
    this.cartItems = cartItems;
    this.name = name;
  }
}
