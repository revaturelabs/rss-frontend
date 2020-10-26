import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Product } from '../../models/product.model';
import { InventoryService } from '../../service/inventory.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from '../../directives/sortable.directive';
import { SortService } from '../../service/sort.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryItemComponent } from '../inventory-item/inventory-item.component';
import { UserInventoryItemComponent } from '../user-inventory-item/user-inventory-item.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UserService } from 'src/app/User/services/user.service';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/User/models/user';

@Component({
	selector: 'app-inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {

	// Change application view (admin/customer)
	userType: string = "admin";
	user: User;

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
		this.user = this.userService.getCurrentUser();
	}

	open(product) {
		if(this.userType == "admin") {
			const modalRef = this.modalService.open(InventoryItemComponent);
			modalRef.componentInstance.product = product;
			modalRef.componentInstance.userType = this.userType;
		} else {
			const modalRef = this.modalService.open(UserInventoryItemComponent);
			modalRef.componentInstance.product = product;
			modalRef.componentInstance.userType = this.userType;
		}
	}

	updateItem(product: Product) {
		console.log("updateItem() called.");
		console.log(product);
	}

	getAllProducts() {
		this.inventoryService.getAllProducts()
			.subscribe(result => {
				this.service.setInventory(result);
				this.products$ = this.service.products$;
				this.total$ = this.service.total$;
			})
	}

	receiveUpdate($event) {
		this.updateItem($event);
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.parent.breadcrumbs = ['Admin', 'Inventory'];
			this.parent.routerCrumbs = ['admin', 'inventory'];
		});
	}
}