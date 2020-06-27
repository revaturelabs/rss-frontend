import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';
import { Cart } from 'src/app/interfaces/cart.model';
// import { FakeProductsService } from '../fake-products.service';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, first } from 'rxjs/operators';
// import { TempProduct } from '../temp-product';
// import { TempProducts } from '../temp_products';
import { Product } from 'src/app/interfaces/product.model';
import { ProductService } from 'src/app/services/product.service';
// import { parse } from 'path';

@Component({
  selector: 'app-select-cart',
  templateUrl: './select-cart.component.html',
  styleUrls: ['./select-cart.component.css']
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
    color: "N/A"
  }
  // private cartsub: Subscription;
  private ngUnsubscribe: Subject<any> = new Subject();
  // TempProducts = TempProducts;
  tempCart = Cart;
  tempCarts: Cart[] = [];
  activeCartId: number;
  eventId: string;
  toggleRecord: Record<string, boolean> = {};

  /**
   * Constructing SelectCart. Need the user information so if it doesn't exist, make fake user.
   * @param cartService 
   */
  constructor(private cartService: CartService, private productService: ProductService, private userService: UserService) {
    // access hardcoded user
    this.currentUser = this.userService.getCurrentUser();

    // set the default cart to be selected
    // console.log(this.cartService.isCartSelected());

    try {
      this.activeCartId = JSON.parse(sessionStorage.getItem('activecartId'));
      // this.activeCartId = this.getActiveCart().cartId;  
    } catch (error) {
      console.log(error);
    }

    // This gets a list of carts that the user has and stores it
    // console.log(this.currentUser.userCartIds);
    // console.log("Right before the if on line 51")
    // console.log(!!this.currentUser.userCartIds);
    // console.log(this.userCarts.length);
    // console.log(!this.userCarts.length);
    // if (this.currentUser.userCartIds && !this.userCarts.length) {
    //   console.log("Right before the if on line 56");
    //   for (let id of this.currentUser.userCartIds) {
    //     if (id == 0) {
    //       console.log(JSON.parse(sessionStorage.getItem('defaultCart')));
    //       this.userCarts.push(JSON.parse(sessionStorage.getItem('defaultCart')));
    //     } else {
    //       this.cartService.getCartById(id).subscribe(
    //         cart => this.userCarts.push(cart)
    //       )
    //     }
    //   }
    // } else if (!this.currentUser.userCartIds) {
    //   console.log("I am in line 62!")
    //   this.cartService.listCartsByUser(this.currentUser)
    //     .subscribe(carts => {
    //       this.userCarts = carts;
    //       // console.log(carts);
    //       this.currentUser.userCartIds = [];
    //       this.fillToggleRecord(carts);
    //       console.log(this.toggleRecord);

    //       if (carts) {
    //         for (let cart of carts) {
    //           this.currentUser.userCartIds.push(cart.cartId);
    //         }
    //       }
    //       else {
    //         this.currentUser.userCartIds.push(0);
    //       }
    //     })
    // }
    // console.log(this.userCarts.length);
    if (this.userCarts.length == 0) {
      console.log("HIIIII!!!");
      this.cartService.listCartsByUser(this.currentUser)
        .subscribe(carts => {
          this.userCarts = carts;
          console.log(carts);
          // if (sessionStorage.getItem('defaultCart')) {
          //   this.currentUser.userCartIds = [JSON.parse(sessionStorage.getItem('defaultCart'))];
          // }
          this.fillToggleRecord(carts);
          // console.log(this.toggleRecord);
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
    console.log(this.userCarts);
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      }
    )
  }

  ngOnInit(): void {
    // this.currentUser = this.userService.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // getProductById(id: number) {
  //   console.log(this.product);
  //   console.log(id);
  //   if (!this.product || this.product.id != id) {
  //     // this.product = this.noProduct;\
  //     // let sub: Subscription;
  //     // this.product = null;
  //     this.productService.getProductById(id)
  //       .pipe(first())
  //       .subscribe(
  //         fetchedProduct => this.product = fetchedProduct
  //     );
  //     // if (this.product) {
  //     //   this.cartsub.unsubscribe();
  //     // }
  //   }
  //   return this.product;
  // }

  getProductById(id: number): Product {
    this.product = this.noProduct;
    for (let product of this.products) {
      if (product.id == id) {
        this.product = product;
      }
    }
    return this.product;
  }

  getProductByIdService(id: number): Observable<Product> {
    return this.productService.getProductById(id);
  }

  setActiveCart(cart: Cart) {
    //   
    this.cartService.setActiveCart(cart);
    // active cart id is determined by which you click on to send the id forward
    this.activeCartId = cart.cartId;
    sessionStorage.setItem('activecartId', JSON.stringify(this.activeCartId));
  }

  getActiveCart() {
    let activeCart: Cart;
    if (this.cartService.isCartSelected()) {
      activeCart = this.cartService.getActiveCart();
      // this.cartsub = this.cartService.getActiveCart()
      //   .subscribe((cart: Cart) => {
      //     console.log(cart);
      //     activeCart = cart;
      //   });
    } else {
      activeCart = null;
    }
    return activeCart;
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
