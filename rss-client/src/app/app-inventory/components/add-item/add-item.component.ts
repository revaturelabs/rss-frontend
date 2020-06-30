import { Component, OnInit } from '@angular/core';
import { Product } from '../../class/product/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InventoryService } from '../../service/inventory.service';
import { environment } from "../../../../environments/environment";
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	userType: string = 'customer';
	product: Product;

	constructor(private http: HttpClient, private router: Router, private inventoryService: InventoryService,
		private userService: UserService, private parent: AppComponent) { }

	ngOnInit(): void {
		this.product = new Product();
		// this.userType = environment.admin ? 'admin' : 'customer';
		this.userType = this.userService.getCurrentUser().admin ? 'admin' : 'customer';
	}

	// Adds an item to inventory and route to inventory list
	addItem() {
		this.inventoryService.addProduct(this.product).subscribe(data => {
			this.router.navigate(['/inventory/inventory-list'])
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.parent.breadcrumbs = ['Admin', 'Inventory', 'Add-Item'];
			this.parent.routerCrumbs = ['admin', 'inventory', 'inventory/add-item'];
		});
	}
}
