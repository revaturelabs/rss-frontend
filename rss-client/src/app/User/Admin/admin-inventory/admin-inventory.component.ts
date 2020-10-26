import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.scss'],
})
export class AdminInventoryComponent implements OnInit {
  @Output() navigateEvent = new EventEmitter();

  constructor(private parent: AppComponent) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Admin', 'Inventory'];
      this.parent.routerCrumbs = ['admin', 'inventory'];
    });
  }

  navigateBack() {
    this.navigateEvent.emit('');
  }
}
