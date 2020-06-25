import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
})
export class AccountSettingsPageComponent implements OnInit {

  user: User;
  isLoggedIn;
  userProfileForm: FormGroup;


  constructor(
    private userservice: UserService,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.getUser();
    this.userProfileForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  getUser() {
    this.user = this.userservice.getCurrentUser()
    this.editForm(this.user);
  }
  editForm(user: User) {
    this.userProfileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })
  }





}
