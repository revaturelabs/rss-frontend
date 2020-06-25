import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';
import { Cart } from 'src/app/interfaces/cart.model';
import { FakeProductsService } from '../fake-products.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { TempProduct } from '../temp-product';
import { TempProducts } from '../temp_products';

@Component({
  selector: 'app-select-cart',
  templateUrl: './select-cart.component.html',
  styleUrls: ['./select-cart.component.css']
})
export class SelectCartComponent implements OnInit {

  currentUser: User;
  userCarts: Cart[];
  product: TempProduct;
  private cartsub: Subscription;
  down: boolean = true;
  TempProducts = TempProducts;
  tempCart = Cart;
  tempCarts: Cart[] = [];
  selected: boolean;
  activeCartId: number;
  // currentCart: Cart;

  /**
   * Constructing SelectCart. Need the user information so if it doesn't exist, make fake user.
   * @param cartService 
   */
  constructor(private cartService: CartService, private productService: FakeProductsService, private userService: UserService) {
    // access hardcoded user
    this.currentUser = this.userService.getCurrentUser();

    // set the default cart to be selected
    console.log(this.cartService.isCartSelected());
    
    try {
      
      this.activeCartId = JSON.parse(sessionStorage.getItem('activecartId'));
      // this.activeCartId = this.getActiveCart().cartId;  
    } catch (error) {
      console.log(error);
    }

    // hardcoded carts
    // this.tempCart = {cartId: 0, 0, [], "firstcart"};

    // making a fake user if one doesn't exist
    // if (!this.currentUser) {
    //   this.currentUser = {
    //     userId: 0,
    //     email: "test@test.net",
    //     password: "password",
    //     profilePic: new Blob(),
    //     firstName: "Test",
    //     lastName: "Testerson",
    //     admin: false,

    //   };
    // }
    // This gets a list of carts that the user has and stores it
    // console.log(this.currentUser.userCartIds);
    if (!this.currentUser.userCartIds || !this.userCarts) {
      this.cartService.listCartsByUser(this.currentUser)
        .subscribe(carts => {
          this.userCarts = carts;
          console.log(carts);
          this.currentUser.userCartIds = [];
          if (carts) {
            for (let cart of carts) {
              this.currentUser.userCartIds.push(cart.cartId);
            }
          }
          else {
            this.currentUser.userCartIds.push(0);
          }
        })
    }
  }

  ngOnInit(): void {
    // this.currentUser = this.userService.getCurrentUser();
  }

  getProductById(id: number) {
    if (!this.product || this.product.id != id) {
      this.productService.getProductById(id).subscribe(fetchedProduct => {
        this.product = fetchedProduct;
      });
    }
    return this.product;
  }

  setActiveCart(cart: Cart) {  
    //   
    this.cartService.setActiveCart(cart);
    // active cart id is determined by which you click on to send the id forward
    this.activeCartId = cart.cartId;
    sessionStorage.setItem('activecartId',JSON.stringify(this.activeCartId) );
  }

  getActiveCart() {
    let activeCart: Cart;
    if (this.cartService.isCartSelected()) {
      this.cartsub = this.cartService.getActiveCart()
        .subscribe((cart: Cart) => {
          console.log(cart);
          activeCart = cart;
        });
    } else {
      activeCart = null;
    }
    return activeCart;
  }

  // makeCartCardId(cart: Cart) {
  //   return `cartDetails${cart.cartId}`;
  // }

  // makeCartCardIdWithHashtag(cart: Cart) {
  //   return `#cartDetails${cart.cartId}`;
  // }

  // setCurrentCart(cart: Cart) {
  //   this.currentCart = cart;
  // }

  toggle() {
    // this.down = !this.down;

    // if (this.down) {
    //   document.getElementById("dropdown-img").style.transform = "rotate(0deg)";  
    // } else if (!this.down) {
    //   document.getElementById("dropdown-img").style.transform = "rotate(180deg)";  
    // }
    // console.log("again");

  }
}
