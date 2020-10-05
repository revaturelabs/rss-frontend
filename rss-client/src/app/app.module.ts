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
import { StoreModule } from '@ngrx/store';
import { reducer } from './LandingPage/Auth/reducers/user.reducer';
import { CartModule } from './Cart/cart.module';
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
    LandingPageComponent
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
    Quiz1Module,
    CartModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
