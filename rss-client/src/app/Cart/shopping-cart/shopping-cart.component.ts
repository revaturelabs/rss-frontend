import { HostListener, Component, OnInit, Input } from '@angular/core';
// temporary fake products
import { Product } from '../../interfaces/product.model';

import { Cart } from 'src/app/interfaces/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from '../../services/product.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router, provideRoutes } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../interfaces/account'
import { CartItem } from 'src/app/interfaces/cart-item.model';
import { threadId } from 'worker_threads';


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
  product: Product;
  testcart: Cart;
  userAccounts: Account[];
  pointPicker: Record<number, number> = {};
  userAccountRecord: Record<number, Account> = {};
  totalPointCost: number = 0;
  successfulPurchase: boolean = false;


  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private accountService: AccountService
  ) {
    // access hardcoded user temporarily
    this.currentUser = this.userService.getCurrentUser();


    let actCartId: number = JSON.parse(sessionStorage.getItem('activecartId'));
    if (actCartId) {
      this.cartService.getCartById(actCartId).subscribe(
        cart => {
          this.activeCart = cart;
          this.getTotalPointCost();
        }
      );
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
        this.getTotalPointCost();
      }
    )

    this.accountService.getAccountsByUser(this.currentUser).subscribe(
      accounts => {
        this.userAccounts = accounts;
        for (let account of accounts) {
          this.pointPicker[account.accId] = 0;
          this.userAccountRecord[account.accId] = account;
        }
      }
    )
    // console.log(this.userAccounts);
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

  updateQuantity(itemId: number) {

    let newQuantity = parseInt((<HTMLInputElement>document.getElementById(`quantity-${itemId}`)).value);


    if (newQuantity > 0) {
      // console.log(newQuantity);
      let ciToUpdate;
      let emptyCartCopy: Cart = {
        cartId: this.activeCart.cartId,
        userId: this.activeCart.userId,
        name: this.activeCart.name,
        cartItems: []
      }
      for (let cItem of this.activeCart.cartItems) {
        if (cItem.cartItemId == itemId) {
          cItem.quantity = newQuantity;
          ciToUpdate = {
            cartItemId: cItem.cartItemId,
            cart: emptyCartCopy,
            productId: cItem.productId,
            quantity: cItem.quantity,
          }
          break;
          // console.log(cItem.quantity);
        }
      }
      this.getTotalPointCost();
      this.ciService.updateCartItem(ciToUpdate).subscribe();
    } else {
      alert("Can't have 0 or negative quantity")
    }
  }

  deleteItem(cartItem: CartItem) {
    this.ciService.deleteCartItem(cartItem).subscribe(
      result => {
        const index = this.activeCart.cartItems.indexOf(cartItem);
        if (index > -1) {
          this.activeCart.cartItems.splice(index, 1);
          // console.log(index);
          this.getTotalPointCost();
        }
      }
    );
  }

  async getAndDelete(cartId: number) {
    let testcart: Cart;
    this.cartService.getCartById(cartId).subscribe(
      cart => testcart = cart
    )
    console.log(testcart);
  }

  deleteCart(path: string) {
    if (this.activeCart.cartId == 0) {
      this.activeCart.cartItems = [];
      sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
      if (path == "") {
        alert("Purchase Successful!");
      }
      this.router.navigate([path]);
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
            if (path == "") {
              alert("Purchase Successful!");
            }
            this.router.navigate([path]);
          }
        }
      )
    }
  }

  purchaseCart(): void {
    let terminatePurchase = false;
    let yourPoints: number = this.getYourPoints();
    let newProductRecord: Record<number, Product> = {}
    if (yourPoints == this.totalPointCost) {
      for (let cItem of this.activeCart.cartItems) {
        let ciProduct: Product = this.getProductById(cItem.productId);
        if (cItem.quantity <= ciProduct.quantity) {
          ciProduct.quantity -= cItem.quantity;
          if (ciProduct.quantity > 0) {
            newProductRecord[ciProduct.id] = ciProduct;
          } else {
            terminatePurchase = true;
          }
        } else {
          let properVerb: string;
          ciProduct.quantity == 1 ? properVerb = "is" : properVerb = "are";
          alert("Cannot proceed with purchase! Quantity " + cItem.quantity + " exceeds stock for " + ciProduct.name + ". There " + properVerb + " only " + ciProduct.quantity + " available.");
          terminatePurchase = true;
          break;
        }
      }
      if (!terminatePurchase) {
        for (let accId in this.pointPicker) {
          let accountToUpdate: Account = {
            accId: this.userAccountRecord[accId].accId,
            userId: this.userAccountRecord[accId].userId,
            accTypeId: this.userAccountRecord[accId].accTypeId,
            points: this.userAccountRecord[accId].points - this.pointPicker[accId]
          }
          this.accountService.updateAccount(accountToUpdate);
          this.userAccountRecord[accId] = accountToUpdate;
        }
        for (let prodId in newProductRecord) {
          this.productService.updateProduct(newProductRecord[prodId])
            .subscribe();
        }
        this.deleteCart("");
      }
    }
  }

  displayName(account: Account) {
    let name: string;
    if (account.accTypeId == 0) {
      name = "Quiz Account"
    } else if (account.accTypeId == 1) {
      name = "Bug Bounty"
    }
    return name
  }

  getTotalPointCost() {
    if (this.activeCart && this.products) {
      this.totalPointCost = 0;
      for (let cItem of this.activeCart.cartItems) {
        for (let product of this.products) {
          if (product.id == cItem.productId) {
            this.totalPointCost += product.unitPrice * cItem.quantity;
            break;
          }
        }
      }
    }
  }

  getYourPoints() {
    let points: number = 0;
    let currentAccount: Account;
    for (let accId in this.pointPicker) {
      currentAccount = this.userAccountRecord[accId];
      if (this.pointPicker[accId] > currentAccount.points) {
        points += currentAccount.points;
      } else if (this.pointPicker[accId] < 0) {
        points += 0;
      } else {
        points += this.pointPicker[accId];
      }
    }
    if (points == this.totalPointCost) {
      this.successfulPurchase = true;
    } else {
      this.successfulPurchase = false;
    }
    return points;
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

  productDetails(id: number): any {
    // ask max for url to product details

    // let detailsURL: string = "http://ec2-34-203-75-254.compute-1.amazonaws.com:10003/product/" + id;

    console.log(id);
    // this.router.navigate([detailsURL]);
  }

    // UPDATE
    // updateCart(cart: Cart): Observable<Cart> {
    //   return of(cart);
      // return this.http.put<Cart>(this.baseURL, cart);
    // }

}
