import { InventoryService } from './../../services/inventory.service';

import { Component, OnInit } from '@angular/core';
import { Product } from '../class/product/product';

import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
})
export class InventoryViewComponent implements OnInit {
  products: Product[];

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inventoryService
      .getAllProducts()
      .subscribe((data) => (this.products = data));
  }

  deleteItem(product: Product) {
    console.log('deleteItem() clicked.');
    console.log("Indicex's ID: " + product.id);

    this.inventoryService
      .deleteProductById(product.id)
      .subscribe(() => this.getAllProducts());
  }

  updateItem(product: Product) {
    this.inventoryService
      .updateProduct(product)
      .subscribe((res) => console.log(res));
  }

  getAllProducts() {
    this.inventoryService
      .getAllProducts()
      .subscribe((data) => (this.products = data));
  }

  receiveUpdate($event) {
    this.updateItem($event);
  }

  receiveDelete($event) {
    this.deleteItem($event); // Event is a product
  }
}
