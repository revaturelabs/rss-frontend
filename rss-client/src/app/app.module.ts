import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, NgModel } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountPageComponent } from './Account/components/account-page/account-page.component';
import { QuizPageComponent } from './Quiz/components/quiz-page/quiz-page.component';
import { QuizQuesitonComponent } from './Quiz/components/quiz-quesiton/quiz-quesiton.component';
import { ProfilePageComponent } from './Account/components/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountPageComponent,
    QuizPageComponent,
    QuizQuesitonComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
