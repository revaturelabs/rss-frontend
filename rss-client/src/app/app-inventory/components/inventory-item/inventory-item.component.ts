import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../class/product/product';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SortService } from '../../service/sort.service';
import { InventoryService } from '../../service/inventory.service';

@Component({
	selector: 'app-inventory-item',
	templateUrl: './inventory-item.component.html',
	styleUrls: ['./inventory-item.component.css'],
})
export class InventoryItemComponent implements OnInit {

	@Input() product: Product;
	@Input() userType: string;
	admin: boolean = true;
	localQuantity: number;

	constructor(
		private modalService: NgbModal,
		public service: SortService,
		public activeModal: NgbActiveModal,
		private inventoryService: InventoryService) {
	}

	ngOnInit(): void {
		console.log(this.userType);
		console.log(this.admin);

		this.localQuantity = this.product.quantity;

		if (this.userType === 'admin') {
			this.admin = false;
		}
	}

	reduceInventory() {
		console.log("reduceInventory() called.");

		this.product.quantity = this.localQuantity - this.product.quantity;

		if (this.product.quantity > 0) {
			this.updateItem();
		} else {
			this.modalService.dismissAll();
			this.product.quantity = this.localQuantity;
			alert("Insufficient inventory.");
		}
	}

	updateItem() {
		console.log("updateItem() called.");

		this.inventoryService
			.updateProduct(this.product)
			.subscribe((res) => {
				if (res) {
					this.inventoryService.getAllProducts()
						.subscribe(inventory => {
							this.service.setInventory(inventory);
							this.modalService.dismissAll();
						})
				}
			});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
