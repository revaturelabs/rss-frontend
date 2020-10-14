import { HostListener, Component, OnInit } from '@angular/core';
import { InventoryService } from '../../app-inventory/service/inventory.service';

import { Router } from '@angular/router';
import { Product } from 'src/app/app-inventory/models/product.model';
import { User } from 'src/app/User/models/user';
import { AccountService } from 'src/app/User/services/account.service';
import { UserService } from 'src/app/User/services/user.service';
import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';
import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../services/cart.service';
import { Account } from 'src/app/User/models/account';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  mobile: boolean = false;

  currentUser: User;

  activeCart: Cart;
  products: Product[];
  product: Product;
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
    discounted : false,
    discountedAmount : NaN
  }
  userAccounts: Account[];
  pointPicker: Record<number, number> = {};
  userAccountRecord: Record<number, Account> = {};
  totalPointCost: number = 0;
  successfulPurchase: boolean = false;
  displayTotalPoints:number;


  constructor(
    private cartService: CartService,
    private ciService: CartItemService,
    private productService: InventoryService,
    private userService: UserService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.currentUser = this.userService.userPersistance();


    let actCartId: number = JSON.parse(sessionStorage.getItem('activecartId'));
    if (actCartId) {
      let potActCart: Cart = JSON.parse(sessionStorage.getItem('myactivecart'));
      if (potActCart && actCartId == potActCart.cartId) {
        this.activeCart = potActCart;
      } else {
        this.cartService.getCartById(actCartId).subscribe(
          cart => {
            this.activeCart = cart;
            this.getTotalPointCost();
          }
        );
      }
    } else if (actCartId == 0 && sessionStorage.getItem('defaultcart')) {
      this.activeCart = JSON.parse(sessionStorage.getItem('defaultcart'));
    } else if (actCartId == 0) {
      this.activeCart = new Cart(0, this.currentUser.userId, "(default)", []);
      sessionStorage.setItem("defaultcart", JSON.stringify(this.activeCart));
    } else {
      this.activeCart = null;
    }

    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
        this.getTotalPointCost();
      }
    )

    this.accountService.getAccountByUserId(this.currentUser).subscribe(
      accounts => {
        this.userAccounts = accounts;
        for (let account of accounts) {
          this.pointPicker[account.accId] = account.points;
          this.userAccountRecord[account.accId] = account;
        }
      }
    )
  }

  ngOnInit(): void {
    if (window.innerWidth < 550) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  getProductById(id: number) {
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

  updateQuantity(itemId: number) {
    let selectItem = this.activeCart.cartItems.find(item=>{
      return item.cartItemId === itemId;
    })

<<<<<<< HEAD
    console.log(selectItem);
    if (selectItem.quantity > 0) {

=======
    // let newQuantity = parseInt((<HTMLInputElement>document.getElementById(`quantity-${itemId}`)).value);

    let selectItem = this.activeCart.cartItems.find(item=>{
      return item.cartItemId === itemId;
    })

    console.log(selectItem);
    if (selectItem.quantity > 0) {

>>>>>>> f24bf39f991933a29eb4cdadb922c347abf9b5e8
      let ciToUpdate;
      let emptyCartCopy: Cart = {
        cartId: this.activeCart.cartId,
        userId: this.activeCart.userId,
        name: this.activeCart.name,
        cartItems: []
      }
      for (let i = 0; i < this.activeCart.cartItems.length; i++) {
        let cItem = this.activeCart.cartItems[i];
        if (cItem.cartItemId == itemId) {
          this.activeCart.cartItems[i].quantity = selectItem.quantity;
          ciToUpdate = {
            cartItemId: cItem.cartItemId,
            cart: emptyCartCopy,
            productId: cItem.productId,
            quantity: cItem.quantity,
          }
          break;
        }
      }
      this.getTotalPointCost();
      if (this.activeCart.cartId == 0) {
        sessionStorage.setItem("defaultcart", JSON.stringify(this.activeCart));
      } else {
        this.ciService.updateCartItem(ciToUpdate).subscribe();
      }
      sessionStorage.setItem("myactivecart", JSON.stringify(this.activeCart));
    } else {
      alert("Can't have 0 or negative quantity")
    }
  }

  deleteItem(cartItem: CartItem) {
    if (cartItem.cartItemId >= 0) {
      this.ciService.deleteCartItem(cartItem).subscribe(
        result => {
          const index = this.activeCart.cartItems.indexOf(cartItem);
          if (index > -1) {
            this.activeCart.cartItems.splice(index, 1);
            sessionStorage.setItem("myactivecart", JSON.stringify(this.activeCart));
            this.getTotalPointCost();
          }
        }
      );
    } else {
      const index = this.activeCart.cartItems.indexOf(cartItem);
      if (index > -1) {
        this.activeCart.cartItems.splice(index, 1);
        sessionStorage.setItem("myactivecart", JSON.stringify(this.activeCart));
        this.getTotalPointCost();
      }
    }
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
          if ([200, 201, 202].includes(resp.status)) {            
            sessionStorage.removeItem("activecartId");
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
    if (yourPoints >= this.totalPointCost) {
      for (let cItem of this.activeCart.cartItems) {
        let ciProduct: Product = this.getProductById(cItem.productId);
        if (cItem.quantity <= ciProduct.quantity) {
          ciProduct.quantity -= cItem.quantity;
          newProductRecord[ciProduct.id] = ciProduct;
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
            points : this.userAccountRecord[accId].points - this.totalPointCost
          }
          this.accountService.setPoints(accountToUpdate).subscribe();
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
    if (account.accTypeId == 2) {
      name = "Quiz Account"
    } else if (account.accTypeId == 1) {
      name = "Bug Bounty"
    }
    else if(account.accTypeId == 3){
      name = "Rev OverFlow"
    }
    return name
  }

  getTotalPointCost() {
    if (this.activeCart && this.products) {
      this.totalPointCost = 0;
      for (let cItem of this.activeCart.cartItems) {
        for (let product of this.products) {
          if (product.id == cItem.productId) {
            if (product.discountedAmount>0) {
              let tempProduct : number = product.unitPrice - (product.unitPrice * (product.discountedAmount*0.01));
              console.log(cItem.quantity)
              this.totalPointCost += Math.round(tempProduct * cItem.quantity);

            } else {
              this.totalPointCost += (product.unitPrice) * cItem.quantity;
            }
          } 
        } 
      }     
      if (this.currentUser.userDiscounted) {
        let tempUserCost : number = 1 - (this.currentUser.userDiscount * 0.01);
        this.totalPointCost *= tempUserCost;
        this.totalPointCost = Math.round(this.totalPointCost);

      }
      if (this.totalPointCost<0) {
        this.totalPointCost=0;
      }
    }
    this.displayTotalPoints = this.totalPointCost;
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
    if (points >= this.totalPointCost) {
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
          if (this.activeCart.cartItems.length > 0) {
            for (let cItem of this.activeCart.cartItems) {
              let tempCartItem = {
                cartItemId: -1,
                cart: generatedCart,
                productId: cItem.productId,
                quantity: cItem.quantity
              }
              this.ciService.addCartItem(tempCartItem).subscribe(
                resp => {
                  console.log("about to redirect");
                  this.router.navigate(["selectcart"]);
                }
              );
            }
          } else {
            this.router.navigate(["selectcart"]);
          }
        }
      );
    } else {
      alert("You must change the name from '(default)' in order to save your cart.")
    }
  }

  // Do in the near future. Show product details when clicking image.
  productDetails(id: number): any {
    // ask max for url to product details

    // let detailsURL: string = "http://ec2-34-203-75-254.compute-1.amazonaws.com:10003/product/" + id;

    // console.log(id);
    // this.router.navigate([detailsURL]);
  }

  getUpdateTotalPoints(){
    let elements = document.getElementsByClassName("allPointInputs");
    this.displayTotalPoints = this.totalPointCost;
    for(let i = 0; i < elements.length; i++){
      let element = elements[i].attributes.getNamedItem("ng-reflect-model")
      if(element !== null && Number(element.value) >= 0){
          this.displayTotalPoints = this.displayTotalPoints - Number(element.value);
          if(this.displayTotalPoints < 0){
            this.displayTotalPoints = 0;
          }
      }
    }
  }
}