import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../../models/product.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../../service/inventory.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/Cart/models/cart.model';
import { User } from 'src/app/User/models/user';
import { UserService } from 'src/app/User/services/user.service';
import { CartItemService } from 'src/app/Cart/services/cart-item.service';
import { CartItem } from 'src/app/Cart/models/cart-item.model';

@Component({
  selector: 'app-user-inventory-item',
  templateUrl: './user-inventory-item.component.html',
  styleUrls: ['./user-inventory-item.component.scss']
})
export class UserInventoryItemComponent implements OnInit {
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
		public activeModal: NgbActiveModal,
		private inventoryService: InventoryService,
		private userService: UserService,
		private cartItemService: CartItemService,
		private router: Router) {
	}

	ngOnInit(): void {
		this.localQuantity = 1;

		this.updateProduct = new FormGroup({
			id: new FormControl(this.product.id),
			name: new FormControl({value: this.product.name, disabled: this.admin}, [Validators.required]),
			brand: new FormControl({ value: this.product.brand, disabled: this.admin }),
			description: new FormControl({ value: this.product.description, disabled: this.admin }),
			model: new FormControl({ value: this.product.model, disabled: this.admin }),
			category: new FormControl({ value: this.product.category, disabled: this.admin }),
			image: new FormControl({ value: this.product.image, disabled: this.admin }),
			quantity: new FormControl({value: 1, disabled: !this.admin}, [Validators.required]),
			unitPrice: new FormControl({ value: this.product.unitPrice, disabled: this.admin}, [Validators.required]),
			color: new FormControl({ value: this.product.color, disabled: this.admin }),
			discountedAmount: new FormControl({ value: this.product.discountedAmount, disabled: this.admin }),
			discounted: new FormControl({ value: this.product.discounted, disabled: this.admin }),
			//currentPrice: new FormControl({value: this.product.unitPrice - this.product.discountedAmount, disabled: true })
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
		this.localQuantity = this.updateProduct.get("quantity").value;
		let quantityLeft = this.localQuantity - this.quantity.value;
		console.log(quantityLeft);
		if (quantityLeft >= 0 && this.quantity.value >= 0) {
			// console.log(this.activeCart);
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
			// console.log(existingCartItem);
			if (existingCartItem) {
				// udpate the cart item if there's one to update
				// console.log("Found existing cart item.")
				if (this.activeCart.cartId == 0) {
					// console.log("This is a default cart.")
					sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId))
				} else {
					// console.log("This is not a default cart.")
					let updateCartItem = {
						cartItemId: existingCartItem.cartItemId,
						cart: activeCartCopy,
						productId: existingCartItem.productId,
						quantity: existingCartItem.quantity
					}
					this.cartItemService.updateCartItem(updateCartItem).subscribe(
						() => {
							// console.log("I updated the backend")
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
				// console.log("This is a new cart item.");
				// Add new cart item (cartItemId will be autogenerated so long as it doesn't exist in the DB)
				let cartItemToAdd = {
					cartItemId: -1 - this.activeCart.cartItems.length,
					cart: activeCartCopy,
					productId: this.product.id,
					quantity: this.quantity.value
				}
				if (this.activeCart.cartId == 0) {
					// console.log("This is a default cart");
					// console.log(cartItemToAdd);
					this.activeCart.cartItems.push(cartItemToAdd);
					sessionStorage.setItem('defaultcart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
					sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
				} else {
					// console.log("this is not a default cart.")
					this.cartItemService.addCartItem(cartItemToAdd).subscribe(
						cartItem => {
							// console.log("I updated the backend");
							this.activeCart.cartItems.push(cartItem);
							sessionStorage.setItem('myactivecart', JSON.stringify(this.activeCart));
							sessionStorage.setItem('activecartId', JSON.stringify(this.activeCart.cartId));
						}
					);
				}
			}
			this.activeModal.dismiss('Put items in cart');
		} else {
			// this.modalService.dismissAll();
			this.quantity.setValue(this.localQuantity);
			this.negativeQ = true;
			// alert("Insufficient inventory.");
		}
	}

	updateItem() {
		if (this.updateProduct.get("discountedAmount").value !== null && this.updateProduct.get("discountedAmount").value !== 0) {
			console.log("discountPrice has a value");
			this.updateProduct.get("discounted").setValue(true);
			console.log(this.updateProduct.value);
		} else {
			console.log("discountPrice does not have a value");
			this.updateProduct.get("discounted").setValue(false);
			console.log(this.updateProduct.value);
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
									console.log("'Refreshed'");
								}); 
								this.modalService.dismissAll();
								console.log("Dismissing modal");
							})
					}
				});
		} else {
			alert("Update Invalid.");
		}
	}
}
