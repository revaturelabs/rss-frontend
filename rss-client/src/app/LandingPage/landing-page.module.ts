import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';

import { LandingPageComponent } from 'src/app/LandingPage/components/landing/landing-page.component';
import { LoginPageComponent } from 'src/app/LandingPage/components/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/LandingPage/Auth/reducers/user.reducer';


@NgModule({
  declarations: [
    LandingPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    StoreModule.forRoot(reducer, {})
  ],
  exports:[
    LoginPageComponent,
    LandingPageComponent
  ]
})
export class LandingPageModule { }
