import { CartItem } from './cart-item.model';

export class Cart {
  cartId: number;
  userId: number;
  cartItems: CartItem[];
  name: string;

  constructor(cartId?: number, userId?: number, cartItems?: CartItem[], name?: string) {
    this.cartId = cartId;
    this.userId = userId;
    this.cartItems = cartItems;
    this.name = name;
  }
}
