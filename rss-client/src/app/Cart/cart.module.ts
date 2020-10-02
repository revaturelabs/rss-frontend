import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import{ UserModule } from 'src/app/User/user.module';
import { AppInventoryModule } from '../app-inventory/app-inventory.module';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SelectCartComponent } from './select-cart/select-cart.component';

import {CartItemService} from './services/cart-item.service';
import {CartService} from './services/cart.service';
import { QuizModule } from '../Quiz/quiz.module';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    SelectCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    AppInventoryModule,
    UserModule,
    QuizModule
  ],
  providers:[
    CartService,
    CartItemService,
  ],
})
export class CartModule { }
