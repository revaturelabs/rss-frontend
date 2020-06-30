import { Component, OnInit } from '@angular/core';
import { Product } from '../../class/product/product';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InventoryService } from '../../service/inventory.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	userType: string = 'customer';
	product: Product;
	currentUser: User;

	constructor(private http: HttpClient, private router: Router, private inventoryService: InventoryService, private userService: UserService, private location: Location) { }

	ngOnInit(): void {
		this.product = new Product();
		this.currentUser = this.userService.getCurrentUser();
		this.userType = this.currentUser.admin ? 'admin' : 'customer';
	}

	// Adds an item to inventory and route to inventory list
	addItem() {
		this.inventoryService.addProduct(this.product).subscribe(data => {
			this.router.navigate(['/inventory-list'])
		});
	}

	goBack() {
		this.location.back();
	}
}
