import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Common/header/header.component';
import { AccountPageComponent } from './Account/components/account-page/account-page.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  {path: 'account/dashboard', component: AccountPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
