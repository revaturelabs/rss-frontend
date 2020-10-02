import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Common/header/header.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { LandingPageComponent } from './LandingPage/components/landing-page/landing-page.component';
import { ShoppingCartComponent } from './Cart/shopping-cart/shopping-cart.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './LandingPage/Auth/reducers/user.reducer';
// import { AdminPageComponent } from './User/Admin/admin-page/admin-page.component';
// import { AdminQuizComponent } from './User/Admin/admin-quiz/admin-quiz.component';
// import { AdminInventoryComponent } from './User/Admin/admin-inventory/admin-inventory.component';
import { SelectCartComponent } from './Cart/select-cart/select-cart.component';
import { UserModule } from './User/user.module';
import { AppInventoryModule } from "../app/app-inventory/app-inventory.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Quiz1Module } from './Quiz/quiz1.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EarnpointsOverviewPageComponent,
    LandingPageComponent,
    ShoppingCartComponent,
    // AdminPageComponent,
    // AdminQuizComponent,
    // AdminInventoryComponent,
    SelectCartComponent,
  ],
  imports: [
    UserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    StoreModule.forRoot(reducer, {}),
    AppInventoryModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    Quiz1Module
  ],
  providers: [
    SelectCartComponent,
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
