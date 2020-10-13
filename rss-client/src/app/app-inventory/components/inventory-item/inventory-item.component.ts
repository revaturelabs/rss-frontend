import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../../models/product.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SortService } from '../../service/sort.service';
import { InventoryService } from '../../service/inventory.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/Cart/models/cart.model';
import { User } from 'src/app/User/models/user';
import { UserService } from 'src/app/User/services/user.service';
import { CartItemService } from 'src/app/Cart/services/cart-item.service';
import { CartItem } from 'src/app/Cart/models/cart-item.model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
	selector: 'app-inventory-item',
	templateUrl: './inventory-item.component.html',
	styleUrls: ['./inventory-item.component.scss'],
})
export class InventoryItemComponent implements OnInit {

	@Input() product: Product;
	@Input() userType: string;
	admin: boolean = true;
	localQuantity: number;
	activeCart: Cart;
	currentUser: User;

	nProduct: Product = new Product();

	negativeQ: boolean = false;

	updateProduct: FormGroup;

	get name() { return this.updateProduct.get('name') }
	get image() { return this.updateProduct.get('image') }
	get quantity() { return this.updateProduct.get('quantity') }
	get unitPrice() { return this.updateProduct.get('unitPrice') }
	get discountedAmount(){return this.updateProduct.get('discountAmount')}
	get discounted(){return this.updateProduct.get('discounted')}
	get color(){return this.updateProduct.get('color')}


	constructor(
		private modalService: NgbModal,
		public service: SortService,
		public activeModal: NgbActiveModal,
		private inventoryService: InventoryService,
		private userService: UserService,
		private cartItemService: CartItemService,
		private router: Router) {
	}

	ngOnInit(): void {
		this.localQuantity = this.product.quantity;
		if (this.userService.userPersistance().admin){
			this.userType = 'admin';
		}
		if (this.userType === 'admin') {
			this.admin = false;
		}

		this.updateProduct = new FormGroup({
			id: new FormControl(this.product.id),
			name: new FormControl({value: this.product.name, disabled: this.admin}, [Validators.required]),
			brand: new FormControl({ value: this.product.brand, disabled: this.admin }),
			description: new FormControl({ value: this.product.description, disabled: this.admin }),
			model: new FormControl({ value: this.product.model, disabled: this.admin }),
			category: new FormControl({ value: this.product.category, disabled: this.admin }),
			image: new FormControl({ value: this.product.image, disabled: this.admin }),
			quantity: new FormControl({value: this.product.quantity, disabled: this.admin}, [Validators.required]),

			unitPrice: new FormControl({ value: this.product.unitPrice, disabled: this.admin}, [Validators.required]),
			color: new FormControl({ value: this.product.color, disabled: this.admin }),
			discountedAmount: new FormControl({ value: this.product.discountedAmount, disabled: this.admin }),
			discounted: new FormControl({ value: this.product.discounted, disabled: this.admin })
		});

		

		this.currentUser = this.userService.getCurrentUser();

		if (!this.currentUser.admin) {
			if (sessionStorage.getItem("myactivecart")) {
				this.activeCart = JSON.parse(sessionStorage.getItem("myactivecart"));
			} else if (sessionStorage.getItem('defaultcart')) {
				this.activeCart = JSON.parse(sessionStorage.getItem('defaultcart'));
				sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
				sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
			} else {
				this.activeCart = new Cart(0, this.currentUser.userId, "(default)", []);
				sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
				sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
				sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
			}
		}
	}

	reduceInventory() {
		let quantityLeft = this.localQuantity - this.quantity.value;
		if (quantityLeft >= 0 && this.quantity.value >= 0) {
			// Copy the active cart for establishing ownership in the backend
			let activeCartCopy: Cart = {
				cartId: this.activeCart.cartId,
				userId: this.activeCart.userId,
				name: this.activeCart.name,
				cartItems: []
			}
			// Check activeCart's cart items for an existing product
			let existingCartItem: CartItem = null;
			for (let cartItem of this.activeCart.cartItems) {
				if (cartItem.productId == this.product.id) {
					cartItem.quantity += this.quantity.value;
					existingCartItem = cartItem;
					break;
				}
			}
			if (existingCartItem) {
				// udpate the cart item if there's one to update
				if (this.activeCart.cartId == 0) {
					sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId))
				} else {
					let updateCartItem = {
						cartItemId: existingCartItem.cartItemId,
						cart: activeCartCopy,
						productId: existingCartItem.productId,
						quantity: existingCartItem.quantity
					}
					this.cartItemService.updateCartItem(updateCartItem).subscribe(
						() => {
							// Find the active cart's corresponding cart item and update the quantity
							for (let i = 0; i < this.activeCart.cartItems.length; i++) {
								if (this.activeCart.cartItems[i].cartItemId == existingCartItem.cartItemId) {
									this.activeCart.cartItems[i].quantity = existingCartItem.quantity;
									break;
								}
							}
							// Update the active cart and activecartId
							sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
							sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId))
						}
					)
				}
			} else {
				// Add new cart item (cartItemId will be autogenerated so long as it doesn't exist in the DB)
				let cartItemToAdd = {
					cartItemId: -1 - this.activeCart.cartItems.length,
					cart: activeCartCopy,
					productId: this.product.id,
					quantity: this.quantity.value
				}
				if (this.activeCart.cartId == 0) {
					this.activeCart.cartItems.push(cartItemToAdd);
					sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
				} else {
					this.cartItemService.addCartItem(cartItemToAdd).subscribe(
						cartItem => {
							this.activeCart.cartItems.push(cartItem);
							sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
							sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
						}
					);
				}
			}
			this.activeModal.dismiss('Put items in cart');
		} else {
			this.quantity.setValue(this.localQuantity);
			this.negativeQ = true;
		}
	}

	updateItem() {
		if (this.updateProduct.get("discountedAmount").value !== null && this.updateProduct.get("discountedAmount").value !== 0) {
			this.updateProduct.get("discounted").setValue(true);
		} else {
			this.updateProduct.get("discounted").setValue(false);
		}
		if (this.updateProduct.valid) {
			this.inventoryService
				.updateProduct(this.updateProduct.value)
				.subscribe((res) => {
					if (res) {
						this.inventoryService.getAllProducts()
							.subscribe(inventory => {
								this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
									this.router.navigateByUrl('/inventory/inventory-list');
								}); 
								this.service.setInventory(inventory);
								this.modalService.dismissAll();
							})
					}
				});
		} else {
			alert("Update Invalid.");
		}
	}

	deleteItem(product: Product) {
		const modalRef = this.modalService.open(ConfirmationModalComponent);
		modalRef.componentInstance.product = product;
	}

	receiveDelete($event) {
		this.deleteItem($event);
	}
}