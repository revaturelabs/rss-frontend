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
import { Router } from '@angular/router';
import { SelectCartComponent } from '../select-cart/select-cart.component';


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
  // cartItemArray: CartItem[] = [];
  prArray: TempProduct[] = [];
  prIdArray: number[] = [];
  product: TempProduct;
  testcart: Cart;




  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: FakeProductsService,
    private userService: UserService,
    private router: Router,
    private selectcart : SelectCartComponent
  ) {
    // access hardcoded user temporarily
    this.currentUser = this.userService.getCurrentUser();


    let actCartId: number = JSON.parse(sessionStorage.getItem('activecartId'));
    if (actCartId || actCartId == 0) {
      this.cartService.getCartById(actCartId).subscribe(cart => this.activeCart = cart);
    } else {
      this.activeCart = null;
    }

  
    var cartobj = JSON.parse(sessionStorage.getItem('myactivecart'));
    this.testcart = cartobj;
    

    // Loop through cart items and pull product information from endpoint to use later
    // for (let cartItem of this.activeCart.cartItems) {
    //   this.productService.getProductById(cartItem.productId)
    //     .subscribe(product => {
    //       this.prArray.push(product);
    //       this.prIdArray.push(product.id);
    //     });
    // }
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

  updateQuantity(itemId) {

    let newQuantity = parseInt((<HTMLInputElement>document.getElementById(`quantity-${itemId}`)).value);

    if (newQuantity > 0) {
      // console.log(newQuantity);
      for (let cItem of this.activeCart.cartItems) {
        if (cItem.cartItemId == itemId) {
          cItem.quantity = newQuantity;
          console.log(cItem.quantity);
        }
      }
    } else {
      // later, give user feedback
    }
  }

  deleteItem(cartItem) {
    const index = this.activeCart.cartItems.indexOf(cartItem);
    if (index > -1) {
      this.activeCart.cartItems.splice(index, 1);
      // console.log(index);
    }
  }

  async getAndDelete(cartId: number) {
    let testcart: Cart;
    this.cartService.getCartById(cartId).subscribe(
      cart => testcart = cart
    )
    console.log(testcart);
  }

  deleteCart() {
    this.cartService.listCartsByUser(this.currentUser).subscribe(res => {
      for (let r of res) {
        console.log(JSON.stringify(r.cartItems));
      }
    })
    console.log(this.currentUser.userCartIds + " front before");
    console.log(sessionStorage.getItem("activecartId") === null);
    console.log(this.activeCart);



    // delete the cart on backend
    this.cartService.getCartById(127).subscribe(cart => {
      console.log(cart);
      this.testcart = cart;
      console.log(this.cartService.deleteCart(cart));
    });
    console.log(this.testcart);

    // if (this.cartService.deleteCart(this.testcart)) {
    if (this.cartService.deleteCart(this.testcart)) {
      let userCarts: Cart[];
      this.cartService.listCartsByUser(this.currentUser).subscribe(
        carts => userCarts = carts
      );
      console.log(userCarts);
      // console.log(this.cartService.listCartsByUser(this.currentUser) + " backend after");

      // delete the active cart on frontend
      // find the id of the cart to be deleted
      let index = this.currentUser.userCartIds.indexOf(this.activeCart.cartId);
      // splice out this cart from the user's cart array
      if (index > -1) {
        this.currentUser.userCartIds.splice(index, 1);
        console.log(this.currentUser.userCartIds + " front after");

      }
      sessionStorage.removeItem("activecartId");
      console.log(sessionStorage.getItem("activecartId") === null);

      this.router.navigate(["selectcart"]);
    } else {

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

saveCart(){
  this.testcart.userId = this.currentUser.userId;
  this.cartService.addCart(this.testcart).subscribe(res => this.router.navigate(["selectcart"]));
}



}
