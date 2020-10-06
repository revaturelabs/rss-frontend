import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Common/header/header.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { LandingPageModule } from 'src/app/LandingPage/landing-page.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './LandingPage/Auth/reducers/user.reducer';
import { CartModule } from './Cart/cart.module';
import { UserModule } from './User/user.module';
import { AppInventoryModule } from "../app/app-inventory/app-inventory.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuizModule } from './Quiz/quiz.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EarnpointsOverviewPageComponent
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
    QuizModule,
    CartModule,
    LandingPageModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
