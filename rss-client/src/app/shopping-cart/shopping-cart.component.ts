import { HostListener, Component, OnInit } from '@angular/core';
// temporary fake products
import { TempProducts } from './temp_products';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
TempProducts = TempProducts;
mobile:boolean = false;
  

  constructor() { }

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
