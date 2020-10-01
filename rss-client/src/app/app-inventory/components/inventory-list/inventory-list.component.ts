import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Product } from '../../class/product/product';
import { InventoryService } from '../../service/inventory.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from '../../directives/sortable.directive';
import { SortService } from '../../service/sort.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryItemComponent } from '../inventory-item/inventory-item.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UserService } from 'src/app/User/user/services/user.service';
import { AppComponent } from 'src/app/app.component';

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
		private userService: UserService,
		private parent: AppComponent) {
		this.getAllProducts();
	}

	ngOnInit(): void {
		this.userType = this.userService.getCurrentUser().admin ? 'admin' : 'customer';
	}

	// FOR ADMIN
	open(product) {
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
		const modalRef = this.modalService.open(ConfirmationModalComponent);
		modalRef.componentInstance.product = product;
	}

	getAllProducts() {
		this.inventoryService.getAllProducts()
			.subscribe(result => {
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

	ngAfterViewInit() {
		setTimeout(() => {
			this.parent.breadcrumbs = ['Admin', 'Inventory'];
			this.parent.routerCrumbs = ['admin', 'inventory'];
		});
	}
}
