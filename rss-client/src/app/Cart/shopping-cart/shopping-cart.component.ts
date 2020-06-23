import { HostListener, Component, OnInit } from '@angular/core';
// temporary fake products
import { TempProducts } from '../temp_products';
import { CartItem } from 'src/app/interfaces/cart-item.model';
import { Cart } from 'src/app/interfaces/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { FakeProductsService } from '../fake-products.service';
import { TempProduct } from '../temp-product';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  TempProducts = TempProducts;
  mobile: boolean = false;

  cart: Cart;
  cartItemArray: CartItem[];
  prArray : TempProduct[];

  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private fps: FakeProductsService
  ) {
    this.cartService
      .getCartByUser_post(JSON.parse(window.sessionStorage.getItem('user')))
      .subscribe(
        (carts) =>
          (this.cart = carts[parseInt(window.sessionStorage.getItem('index'))])
      );
    this.ciService
      .listCartItemsByCart(this.cart)
      .subscribe((items) => (this.cartItemArray = items));
    for(let cartItem of this.cartItemArray){
      this.fps.getProductById(cartItem.productId).subscribe(product =>  this.prArray.push(product));
     
    }
  }

  ngOnInit(): void {
    // console.log(TempProducts);
    // responsive conditional
    if (window.innerWidth < 550) {
      this.mobile = true;
      // console.log("mobile");
    } else {
      this.mobile = false;
      // console.log("not mobile");
    }
  }

  // listen for screen sizes
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // responsive conditional
    if (window.innerWidth < 550) {
      this.mobile = true;
      // console.log("mobile");
    } else {
      this.mobile = false;
      // console.log("not mobile");
    }
  }
}
