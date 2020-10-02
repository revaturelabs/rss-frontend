import { NgModule, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './User/components/account-page/account-page.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { QuizPageComponent } from './Quiz/employee/quiz-page/quiz-page.component';
import { AccountSettingsPageComponent } from './User/components/account-settings-page/account-settings-page.component';
import { IndividualQuizPageComponent } from './Quiz/employee/individual-quiz-page/individual-quiz-page.component';
import { LandingPageComponent } from './LandingPage/components/landing-page/landing-page.component';
import { ShoppingCartComponent } from './Cart/shopping-cart/shopping-cart.component';
import { LoginPageComponent } from './User/components/login-page/login-page.component';
import { AdminPageComponent } from './User/Admin/admin-page/admin-page.component';
import { SelectCartComponent } from './Cart/select-cart/select-cart.component';
import { AddItemComponent } from './app-inventory/components/add-item/add-item.component';
import { InventoryListComponent } from './app-inventory/components/inventory-list/inventory-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'account/dashboard', component: AccountPageComponent },
  { path: 'earnpoints', component: EarnpointsOverviewPageComponent },
  { path: 'quizzes', component: QuizPageComponent },
  { path: 'quizzes/:id', component: IndividualQuizPageComponent },
  { path: 'account/settings', component: AccountSettingsPageComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'selectcart', component: SelectCartComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'inventory-list', component: InventoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
  @Input() config;
  quizConfig;
}
