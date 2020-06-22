import { Cart } from './cart.model';

export class CartItem {
  cartItemId: number;
  cart: Cart;
  productId: number;
  quantity: number;

  constructor(
    cartItemId?: number,
    cart?: Cart,
    productId?: number,
    quantity?: number
  ) {
    this.cartItemId = cartItemId;
    this.cart = cart;
    this.productId = productId;
    this.quantity = quantity;
  }
}
