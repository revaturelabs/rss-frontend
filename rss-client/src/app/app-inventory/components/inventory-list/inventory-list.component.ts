import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Product } from '../../class/product/product';
import { InventoryService } from '../../service/inventory.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from '../../directives/sortable.directive';
import { SortService } from '../../service/sort.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryItemComponent } from '../inventory-item/inventory-item.component';

import { UserService } from "../../../services/user.service";

@Component({
	selector: 'app-inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {

	// Change application view (admin/customer)
	userType: string = "admin";

	products$: Observable<Product[]>;
	total$: Observable<number>;

	@ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

	constructor(
		private router: Router,
		private inventoryService: InventoryService,
		public service: SortService,
		private modalService: NgbModal,
		private user: UserService) {
		this.getAllProducts();
	}

	ngOnInit(): void {
		if (!this.user.getCurrentUser().admin)
			this.userType = 'customer';
	}

	// FOR ADMIN
	open(product) {
		console.log("open() called.");

		const modalRef = this.modalService.open(InventoryItemComponent);
		modalRef.componentInstance.product = product;

		modalRef.componentInstance.userType = this.userType;

	}

	// FOR CUSTOMER
	addToCart(product) {
		console.log("addToCart() called.");
		console.log(product);

		// TODO: ADD TO CART, SOMEHOW
	}

	updateItem(product: Product) {
		console.log("updateItem() called.");

		console.log(product);
	}

	deleteItem(product: Product) {
		console.log("deleteItem() called.");

		this.inventoryService
			.deleteProductById(product.id)
			.subscribe((result) => {
				if (!result) {
					this.getAllProducts();
				} else {
					console.log('show something');
				}

			});
	}

	getAllProducts() {
		console.log("getAllProducts() called.");

		this.inventoryService.getAllProducts()
			.subscribe(result => {
				console.log(result);
				this.service.setInventory(result);
				this.products$ = this.service.products$;
				this.total$ = this.service.total$;
			})
	}

	onSort({ column, direction }: SortEvent) {
		// Resetting other headers
		this.headers.forEach(header => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	receiveUpdate($event) {
		this.updateItem($event);
	}

	receiveDelete($event) {
		this.deleteItem($event);
	}
}
