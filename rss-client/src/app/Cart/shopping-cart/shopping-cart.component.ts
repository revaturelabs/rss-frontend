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
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  TempProducts = TempProducts;
  mobile: boolean = false;

  currentUser: User;

  activeCart: Cart;
  cartItemArray: CartItem[] = [];
  prArray: TempProduct[] = [];
  prIdArray: number[] = [];
  product: TempProduct;

  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: FakeProductsService,
    private userService: UserService
  ) {
    // access hardcoded user temporarily
    this.currentUser = this.userService.getCurrentUser();


    let actCartId: number = JSON.parse(sessionStorage.getItem('activecartId'));
    if (actCartId || actCartId == 0) {
      this.cartService.getCartById(actCartId).subscribe(cart => this.activeCart = cart);
    } else {
      this.activeCart = null;
    }


    // Loop through cart items and pull product information from endpoint to use later
    for (let cartItem of this.activeCart.cartItems) {
      this.productService.getProductById(cartItem.productId)
        .subscribe(product => {
          this.prArray.push(product);
          this.prIdArray.push(product.id);
        });
    }
  }

  ngOnInit(): void {
    // responsive conditional
    if (window.innerWidth < 550) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  getProductById(id: number) {
    this.product = null;
    for (let product of this.prArray) {
      if (product.id == id) {
        this.product = product;
      }
    }
    return this.product;
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
