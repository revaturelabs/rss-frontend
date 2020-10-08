import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/app-inventory/components/confirmation-modal/confirmation-modal.component';
import { AppComponent } from 'src/app/app.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  userType: string = "admin";
  users: User[]; 
	total$: Observable<number>;
  user: User;

	constructor(
		private router: Router,
		private modalService: NgbModal,
		private userService: UserService,
    private parent: AppComponent,
    ) {
	}

	ngOnInit(): void {
		this.userType = this.userService.getCurrentUser().admin ? 'admin' : 'customer';
    this.getAllUsers();

  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe(result => {
      this.users = result;
    })
  }

  updateDiscount(user:User) {
    this.userService.updateInfo(user).subscribe(result=> {
      this.user = result;
    })
    this.success()
    //ui ux team
    // please tell the admin that they have successfully
    // updated the discount

  }

  success() {
    console.log('you successfully updated the discount')
  }

  
			

	// FOR ADMIN
	open(product) {
		// const modalRef = this.modalService.open(InventoryItemComponent);
		// modalRef.componentInstance.product = product;
		// modalRef.componentInstance.userType = this.userType;
	}

	// FOR CUSTOMER
	addToCart(product) {
		console.log("addToCart() called.");
		console.log(product);
		// TODO: ADD TO CART, SOMEHOW
	}

	// receiveUpdate($event) {
	// 	this.updateItem($event);
	// }

	// receiveDelete($event) {
	// 	this.deleteItem($event);
	// }

	ngAfterViewInit() {
		setTimeout(() => {
			this.parent.breadcrumbs = ['Admin', 'Inventory'];
			this.parent.routerCrumbs = ['admin', 'inventory'];
		});
	}

}
