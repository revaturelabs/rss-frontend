import { Cart } from './cart.model';

export class CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;

  constructor(
    cartItemId?: number,
    productId?: number,
    quantity?: number
  ) {
    this.cartItemId = cartItemId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
