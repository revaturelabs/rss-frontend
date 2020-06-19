import { Component, OnInit } from '@angular/core';
import { Product } from '../class/product/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InventoryService } from './../../services/inventory.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css'],
})
export class AdminviewComponent implements OnInit {
  product: Product;

  constructor(
    private http: HttpClient,
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.product = new Product();
  }

  addItem() {
    console.log('submitItem() clicked.');

    // Sanity check
    console.log(this.product);

    this.inventoryService
      .addProduct(this.product)
      .subscribe((data) => this.router.navigate(['/inventoryview']));
  }
}
