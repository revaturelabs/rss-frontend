import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { QuizPageComponent } from './Quiz/components/quiz-page/quiz-page.component';
import { HeaderComponent } from './Common/header/header.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { LandingPageComponent } from './LandingPage/components/landing-page/landing-page.component';
// import { IndividualQuizPageComponent } from './Quiz/components/individual-quiz-page/individual-quiz-page.component';
// import { PreTestComponent } from './Quiz/components/pre-test/pre-test.component';
// import { TestInProgressComponent } from './Quiz/components/test-in-progress/test-in-progress.component';
// import { PostTestComponent } from './Quiz/components/post-test/post-test.component';
import { ShoppingCartComponent } from './Cart/shopping-cart/shopping-cart.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/user.reducer';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
// import { AdminQuizComponent } from './Admin/admin-quiz/admin-quiz.component';
import { AdminInventoryComponent } from './Admin/admin-inventory/admin-inventory.component';
// import { AddQuizComponent } from './Quiz/admin/add-quiz/add-quiz.component';
// import { EditQuizComponent } from './Quiz/admin/edit-quiz/edit-quiz.component';
// import { QuizFormComponent } from './Quiz/admin/quiz-form/quiz-form.component';
import { SelectCartComponent } from './Cart/select-cart/select-cart.component';
import { UserModule } from './User/user/user.module';
import { AppInventoryModule } from "../app/app-inventory/app-inventory.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { CheaterWarningComponent, DialogContent } from './Quiz/components/cheater-warning/cheater-warning.component';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { InvalidQuizComponent, InvalidQuizDialogContent } from './Quiz/components/invalid-quiz/invalid-quiz.component';
import { Quiz1Module } from './Quiz1/quiz1.module';

@NgModule({
  declarations: [
    AppComponent,
    // QuizPageComponent,
    HeaderComponent,
    EarnpointsOverviewPageComponent,
    LandingPageComponent,
    // IndividualQuizPageComponent,
    FilterPipe,
    // PreTestComponent,
    // TestInProgressComponent,
    // PostTestComponent,
    ShoppingCartComponent,
    AdminPageComponent,
    // AdminQuizComponent,
    AdminInventoryComponent,
    // AddQuizComponent,
    // EditQuizComponent,
    // QuizFormComponent,
    SelectCartComponent,
    // CheaterWarningComponent,
    // DialogContent,
    // InvalidQuizComponent,
    // InvalidQuizDialogContent
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
