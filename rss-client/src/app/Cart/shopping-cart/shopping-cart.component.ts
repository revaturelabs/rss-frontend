import { HostListener, Component, OnInit, Input } from '@angular/core';
// temporary fake products
import { TempProducts } from '../temp_products';
import { CartItem } from 'src/app/interfaces/cart-item.model';

import { Cart } from 'src/app/interfaces/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { FakeProductsService } from '../fake-products.service';
import { TempProduct } from '../temp-product';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  TempProducts = TempProducts;
  mobile: boolean = false;

  currentUser: User;

  cart: Cart;
  cartItemArray: CartItem[];
  prArray: TempProduct[] = [];

  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private fps: FakeProductsService
  ) {
    // make a fake user if one doesn't exist
    if (!this.currentUser) {
      this.currentUser = {
        userId: 0,
        email: "test@test.net",
        password: "password",
        profilePic: new Blob(),
        firstName: "Test",
        lastName: "Testerson",
        admin: false
      };
    }
    // Get all the carts for this user from the endpoint (will probably change later)
    // And store the selected cart
    this.cartService
      .listCartsByUser(this.currentUser)
      .subscribe(
        carts =>
          this.cart = carts[parseInt(window.sessionStorage.getItem('index'))]
      );
    // Get all the cart items from the selected cart
    this.ciService
      .listCartItemsByCart(this.cart)
      .subscribe(items => this.cartItemArray = items);
    // Loop through cart items and pull product information from endpoint to use later
    for (let cartItem of this.cartItemArray) {
      this.fps.getProductById(cartItem.productId)
        .subscribe(product => this.prArray.push(product));
    }
  }

  /**
   * Given a cart item will get the product information associated with it based on
   * the product array filled in the constructor.
   * @param cartItem 
   */
  getProductFromCartItem(cartItem: CartItem) {
    for (let product of this.prArray) {
      if (cartItem.productId = product.id) {
        return product;
      }
    }
    return null;
  }

  ngOnInit(): void {
    // responsive conditional
    if (window.innerWidth < 550) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  // listen for screen sizes
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // responsive conditional
    if (window.innerWidth < 550) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }
}
