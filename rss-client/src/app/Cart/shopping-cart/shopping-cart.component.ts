import { HostListener, Component, OnInit, Input } from '@angular/core';
// temporary fake products
import { Product } from '../../interfaces/product.model';
import { CartItem } from 'src/app/interfaces/cart-item.model';

import { Cart } from 'src/app/interfaces/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from '../../services/product.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SelectCartComponent } from '../select-cart/select-cart.component';
import { generate } from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  // TempProducts = TempProducts;
  mobile: boolean = false;

  currentUser: User;

  activeCart: Cart;
  // cartItemArray: CartItem[] = [];
  products: Product[];
  prIdArray: number[] = [];
  product: Product;
  testcart: Cart;




  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private selectcart: SelectCartComponent
  ) {
    // access hardcoded user temporarily
    this.currentUser = this.userService.getCurrentUser();


    let actCartId: number = JSON.parse(sessionStorage.getItem('activecartId'));
    if (actCartId) {
      this.cartService.getCartById(actCartId).subscribe(cart => this.activeCart = cart);
    } else if (actCartId == 0 && sessionStorage.getItem('defaultcart')) {
      this.activeCart = JSON.parse(sessionStorage.getItem('defaultcart'));
    } else if (actCartId == 0) {
      this.activeCart = new Cart(0, this.currentUser.userId, "(default)", []);
      sessionStorage.setItem("defaultcart", JSON.stringify(this.activeCart));
    } else {
      this.activeCart = null;
    }
    console.log(this.activeCart);


    var cartobj = JSON.parse(sessionStorage.getItem('myactivecart'));
    this.testcart = cartobj;

    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      }
    )
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
    for (let product of this.products) {
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
    if (this.activeCart.cartId == 0) {
      this.activeCart.cartItems = [];
      sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
      this.router.navigate(["selectcart"]);
    } else {
      this.cartService.deleteCartWithId(this.activeCart.cartId).subscribe(
        resp => {
          console.log(resp);
          if ([200, 201, 202].includes(resp.status)) {
            let index = this.currentUser.userCartIds.indexOf(this.activeCart.cartId);
            // splice out this cart from the user's cart array
            if (index > -1) {
              this.currentUser.userCartIds.splice(index, 1);
              console.log(this.currentUser.userCartIds + " front after");
            }
            sessionStorage.removeItem("activecartId");
            console.log(sessionStorage.getItem("activecartId") === null);
            this.router.navigate(["selectcart"]);
          }
        }
      )
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

  saveCart() {
    if (this.activeCart.name != '(default)') {
      let cartToSave: Cart = {
        cartId: -1,
        userId: this.activeCart.userId,
        name: this.activeCart.name,
        cartItems: []
      };
      this.cartService.addCart(cartToSave).subscribe(
        (generatedCart) => {
          console.log(generatedCart);
          console.log(this.activeCart.cartItems);
          for (let cItem of this.activeCart.cartItems) {
            let tempCartItem = {
              cartItemId: -1,
              cart: generatedCart,
              productId: cItem.productId,
              quantity: cItem.quantity
            }
            console.log(tempCartItem);
            this.ciService.addCartItem(tempCartItem).subscribe(
              resp => this.router.navigate(["selectcart"]));
          }
        }
      );
    }
  }



}
