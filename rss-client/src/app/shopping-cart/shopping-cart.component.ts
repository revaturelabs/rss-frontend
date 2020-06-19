import { Component, OnInit } from '@angular/core';
// temporary fake products
import { TempProducts } from './temp_products';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
TempProducts = TempProducts;
  

  constructor() { }

  ngOnInit(): void {
    console.log(TempProducts);
  }

}
