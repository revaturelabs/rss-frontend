import { CartItemService } from './../../services/cart-item.service';
import { HostListener, Component, OnInit } from '@angular/core';
// temporary fake products
import { TempProducts } from '../temp_products';
import { CartItem } from '../../Interfaces/cart-item.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
TempProducts = TempProducts;
mobile:boolean = false;


cartItemArray: CartItem[];

  constructor(private itemService: CartItemService) {
    this.itemService.getAllCartItemsFromCart().subscribe((itemObject: CartItem[]) => this.cartItemArray = itemObject);
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
