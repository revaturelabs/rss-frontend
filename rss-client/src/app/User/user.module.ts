import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AccountService } from './services/account.service';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
import { AdminQuizComponent } from './Admin/admin-quiz/admin-quiz.component';
import { AdminInventoryComponent } from './Admin/admin-inventory/admin-inventory.component';
import { SESSION_STORAGE } from 'ngx-webstorage-service';
import { USER_SERVICE_STORAGE, UserService } from './services/user.service';



@NgModule({
  declarations: [
    LoginPageComponent,
    AccountSettingsPageComponent,
    AccountPageComponent,
    AdminPageComponent,
    AdminQuizComponent,
    AdminInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    { provide: USER_SERVICE_STORAGE, useExisting: SESSION_STORAGE },
    UserService,
    AccountService
  ],
  exports:[
    LoginPageComponent
  ]
})
export class UserModule { }
