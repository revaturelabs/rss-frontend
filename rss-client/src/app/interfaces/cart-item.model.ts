import { Cart } from './cart.model';

export class CartItem {
    cartItemId: number;
    cart: Cart;
    productId: number;
    quantity: number;
}
