import { CartItem } from './cart-item.model';

export class Cart {
    cartId: number;
    userId: number;
    cartItems: CartItem[];
}
