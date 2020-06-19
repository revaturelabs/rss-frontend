import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../class/product/product';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.css'],
})
export class InventoryItemComponent implements OnInit {
  @Input() product: Product;

  @Output() updateEvent = new EventEmitter<Product>();

  @Output() deleteEvent = new EventEmitter<Product>();

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  updateItem() {
    this.updateEvent.emit(this.product);

    // TODO: BACKEND VALIDATION; MAKE SURE UPDATED FIELDS ARE VALID
  }

  deleteItem() {
    this.deleteEvent.emit(this.product);
  }

  open(itemModal) {
    this.modalService
      .open(itemModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
