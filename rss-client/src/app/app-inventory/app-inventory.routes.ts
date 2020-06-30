import { Routes } from '@angular/router';
import { AddItemComponent } from '../app-inventory/components/add-item/add-item.component';
import { InventoryListComponent } from '../app-inventory/components/inventory-list/inventory-list.component';
import { AdminInventoryComponent } from '../Admin/admin-inventory/admin-inventory.component';

export const inventoryRoutes: Routes = [
    {
        path: 'inventory',
        component: AdminInventoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'inventory-list',
                pathMatch: 'full',
            },
            {
                path: '',
                children: [
                    { path: 'add-item', component: AddItemComponent },
                    { path: 'inventory-list', component: InventoryListComponent },
                ]
            }
        ]
    }

]