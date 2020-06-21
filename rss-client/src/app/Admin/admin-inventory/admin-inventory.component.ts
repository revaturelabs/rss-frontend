import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css'],
})
export class AdminInventoryComponent implements OnInit {
  @Output() navigateEvent = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}
  navigateBack() {
    this.navigateEvent.emit('');
  }
}
