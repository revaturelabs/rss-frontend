import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/Cart/services/cart.service';
import { User } from 'src/app/User/models/user';
import { Cart } from 'src/app/Cart/models/cart.model';
import { UserService } from 'src/app/User/services/user.service';
import { Product } from 'src/app/app-inventory/models/product.model';
import { InventoryService } from '../../app-inventory/service/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-cart',
  templateUrl: './select-cart.component.html',
  styleUrls: ['./select-cart.component.scss']
})
export class SelectCartComponent implements OnInit, OnDestroy {

  currentUser: User;
  userCarts: Cart[] = [];
  product: Product;
  products: Product[];
  noProduct: Product = {
    id: 0,
    name: "No Name",
    description: "No product found",
    brand: "No brand",
    model: "No model",
    category: "No category",
    image: "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg",
    quantity: NaN,
    unitPrice: NaN,
    color: "N/A",
    discounted: false,
    discountedAmount : NaN
  }
  tempCarts: Cart[] = [];
  activeCartId: number;
  eventId: string;
  toggleRecord: Record<string, boolean> = {};

  /**
   * Constructing SelectCart. Need the user information so if it doesn't exist, make fake user.
   * @param cartService 
   */
  constructor(
    private cartService: CartService,
    private productService: InventoryService,
    private userService: UserService,
    private router: Router) {
    // access hardcoded user
    this.currentUser = this.userService.getCurrentUser();

    // set the default cart to be selected
    // console.log(this.cartService.isCartSelected());

    if (sessionStorage.getItem('activecartId')) {
      this.activeCartId = JSON.parse(sessionStorage.getItem('activecartId'));
    } else {
      this.activeCartId = 0;
      sessionStorage.setItem("activecartId", `${this.activeCartId}`);
    }

    // This gets a list of carts that the user has and stores it
    if (this.userCarts.length == 0) {
      this.updateSelectCartView();
    }
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  getProductById(id: number): Product {
    this.product = this.noProduct;
    if (this.products) {
      for (let product of this.products) {
        if (product.id == id) {
          this.product = product;
        }
      }
    }
    return this.product;
  }

  setActiveCart(cart: Cart) {
    //   
    this.cartService.setActiveCart(cart);
    // active cart id is determined by which you click on to send the id forward
    this.activeCartId = cart.cartId;
    sessionStorage.setItem('activecartId', JSON.stringify(this.activeCartId));
    sessionStorage.setItem('myactivecart', JSON.stringify(cart));

  }

  getActiveCart() {
    let activeCart: Cart;
    if (this.cartService.isCartSelected()) {
      activeCart = this.cartService.getActiveCart();
    } else {
      activeCart = null;
    }
    return activeCart;
  }

  updateSelectCartView() {
    this.cartService.listCartsByUser(this.currentUser)
      .subscribe(carts => {
        this.userCarts = carts;
        this.fillToggleRecord(carts);
        // this.currentUser.userCartIds = [];
        // if (carts) {
        //   for (let cart of carts) {
        //     this.currentUser.userCartIds.push(cart.cartId);
        //   }
        // }
        // else {
        //   this.currentUser.userCartIds.push(0);
        // }
      })
  }

  deleteCart(cart: Cart) {
    if (cart.cartId == 0) {
      cart.cartItems = [];
      sessionStorage.setItem('defaultcart', JSON.stringify(cart));
      this.updateSelectCartView()
    } else {
      this.cartService.deleteCartWithId(cart.cartId).subscribe(
        resp => {
          console.log(resp);
          if ([200, 201, 202].includes(resp.status)) {
            // let index = this.currentUser.userCartIds.indexOf(cart.cartId);
            // // splice out this cart from the user's cart array
            // if (index > -1) {
            //   this.currentUser.userCartIds.splice(index, 1);
            //   console.log(this.currentUser.userCartIds + " front after");
            // }
            sessionStorage.removeItem("activecartId");
            console.log(sessionStorage.getItem("activecartId") === null);
            this.updateSelectCartView()
          }
        }
      )
    }
  }

  // this creates a Record (like an object or map with key/value pairs)
  // so we can track whether each individual arrow is point up or down
  fillToggleRecord(carts) {
    for (let cart of carts) {
      this.toggleRecord[`arrow-${cart.cartId}`] = false;
    }
  }


  // to turn the arrow upside down if you expand a cart
  // and visa versa
  toggleArrow(event: Event) {
    // get the id from the event
    this.eventId = (event.target as Element).id;
    // get the image element with that id
    let img = document.getElementById(this.eventId);
    // console.log(img);

    // if there is a record of arrows/booleans to look through...
    if (this.toggleRecord) {
      // toggle each individually on and off
      if (!this.toggleRecord[this.eventId]) {
        this.toggleRecord[this.eventId] = true;
        img.classList.add("uparrow");
        img.classList.remove("downarrow");
      } else {
        this.toggleRecord[this.eventId] = false;
        img.classList.remove("uparrow");
        img.classList.add("downarrow");
      }
    }
  }
}
