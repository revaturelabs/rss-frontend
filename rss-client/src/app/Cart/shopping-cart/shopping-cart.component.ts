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



  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: FakeProductsService,
    private userService: UserService,
    private router: Router
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
    let testcart = this.cartService.getCartById(107)
    if (this.cartService.deleteCart(this.activeCart)) {
      console.log(this.cartService.listCartsByUser(this.currentUser) + " backend after");
      
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
}
