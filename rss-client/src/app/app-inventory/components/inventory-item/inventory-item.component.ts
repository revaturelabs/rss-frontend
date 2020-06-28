import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../class/product/product';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SortService } from '../../service/sort.service';
import { InventoryService } from '../../service/inventory.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/interfaces/cart.model';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartItem } from 'src/app/interfaces/cart-item.model';

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
	activeCart: Cart;
	currentUser: User;

	nProduct: Product = new Product();

	updateProduct: FormGroup;

	get name() { return this.updateProduct.get('name') }
	get image() { return this.updateProduct.get('image') }
	get quantity() { return this.updateProduct.get('quantity') }
	get unitPrice() { return this.updateProduct.get('unitPrice') }

	constructor(
		private modalService: NgbModal,
		public service: SortService,
		public activeModal: NgbActiveModal,
		private inventoryService: InventoryService,
		private userService: UserService,
		private cartItemService: CartItemService) {
	}

	ngOnInit(): void {
		this.localQuantity = this.product.quantity;
		if (this.userType === 'admin') {
			this.admin = false;
		}

		this.updateProduct = new FormGroup({
			id: new FormControl(this.product.id),
			name: new FormControl({ value: this.product.name, disabled: this.admin }, [Validators.required]),
			brand: new FormControl({ value: this.product.brand, disabled: this.admin }),
			description: new FormControl({ value: this.product.description, disabled: this.admin }),
			model: new FormControl({ value: this.product.model, disabled: this.admin }),
			category: new FormControl({ value: this.product.category, disabled: this.admin }),
			image: new FormControl({ value: this.product.image, disabled: this.admin }),
			quantity: new FormControl(this.product.quantity, [Validators.required]),
			unitPrice: new FormControl({ value: this.product.unitPrice, disabled: this.admin }, [Validators.required]),
			color: new FormControl({ value: this.product.color, disabled: this.admin }),
		});

		this.currentUser = this.userService.getCurrentUser();

		if (sessionStorage.getItem("myactivecart")) {
			this.activeCart = JSON.parse(sessionStorage.getItem("myactivecart"));
		} else {
			this.activeCart = JSON.parse(sessionStorage.getItem('defaultcart'));
			sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
			sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId))
		}
	}

	reduceInventory() {
		this.product.quantity = this.localQuantity - this.quantity.value;
		if (this.product.quantity >= 0) {
			console.log(this.activeCart);
			let activeCartCopy: Cart = {
				cartId: this.activeCart.cartId,
				userId: this.activeCart.userId,
				name: this.activeCart.name,
				cartItems: []
			}
			let cartItemToAdd = {
				cartItemId: 0,
				cart: activeCartCopy,
				productId: this.product.id,
				quantity: this.quantity.value
			}
			let addedCartItem: CartItem;
			this.cartItemService.addCartItem(cartItemToAdd).subscribe(
				cartItem => {
					addedCartItem = cartItem;
					this.activeCart.cartItems.push(addedCartItem);
					if (this.activeCart.cartId == 0) {
						sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
					} else {
						sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
						sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId))
					}
				}
			)
		} else {
			this.modalService.dismissAll();
			this.product.quantity = this.localQuantity;
			alert("Insufficient inventory.");
		}
	}

	updateItem() {
		if (this.updateProduct.valid) {
			this.inventoryService
				.updateProduct(this.updateProduct.value)
				.subscribe((res) => {
					if (res) {
						this.inventoryService.getAllProducts()
							.subscribe(inventory => {
								this.service.setInventory(inventory);
								this.modalService.dismissAll();
							})
					}
				});
		} else {
			alert("Update Invalid.");
		}

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
