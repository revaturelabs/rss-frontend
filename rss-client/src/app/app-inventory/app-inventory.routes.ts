import { Routes } from '@angular/router';
import { AddItemComponent } from '../app-inventory/components/add-item/add-item.component';
import { InventoryListComponent } from '../app-inventory/components/inventory-list/inventory-list.component';

export const inventoryRoutes: Routes = [
    { path: 'inventory-add', component: AddItemComponent },
    { path: 'inventory-list', component: InventoryListComponent },
]