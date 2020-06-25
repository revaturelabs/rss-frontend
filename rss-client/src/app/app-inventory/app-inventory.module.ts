import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { inventoryRoutes } from "../app-inventory/app-inventory.routes";

import { AddItemComponent } from '../app-inventory/components/add-item/add-item.component';
import { InventoryListComponent } from '../app-inventory/components/inventory-list/inventory-list.component';
import { InventoryItemComponent } from '../app-inventory/components/inventory-item/inventory-item.component';
import { SortableDirective } from '../app-inventory/directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddItemComponent,
    InventoryListComponent,
    InventoryItemComponent,
    SortableDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(inventoryRoutes),
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [HttpClientModule, DecimalPipe, NgbActiveModal],
  exports: [
    AddItemComponent,
    InventoryListComponent,
  ]
})
export class AppInventoryModule { }
