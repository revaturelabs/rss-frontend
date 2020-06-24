import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';
import { Cart } from 'src/app/interfaces/cart.model';
import { FakeProductsService } from '../fake-products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-cart',
  templateUrl: './select-cart.component.html',
  styleUrls: ['./select-cart.component.css']
})
export class SelectCartComponent implements OnInit {

  currentUser: User;
  userCarts: Cart[];
  /**
   * Constructing SelectCart. Need the user information so if it doesn't exist, make fake user.
   * @param cartService 
   */
  constructor(private cartService: CartService, private productService: FakeProductsService, private userService: UserService) {
    // access hardcoded user
    this.currentUser = this.userService.getCurrentUser();


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
    this.cartService.listCartsByUser(this.currentUser)
      .subscribe(carts => this.userCarts = carts);
  }

  // This is just a proxy for the service function
  // getProductById(id:number) {
  //   return this.productService.getProductById(id);
  // }

  ngOnInit(): void {
  }

}
