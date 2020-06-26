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
    this.userProfileForm = this.fb.group({
      userId: '',
      firstName: '',
      lastName: '',
      email: ''
    })
    this.getUser();

  }

  getUser() {
    this.user = this.userservice.userPersistance();
    console.log(this.user.password)
    this.editForm(this.user);
  }
  editForm(user: User) {
    this.userProfileForm.patchValue({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }

  async submitForm() {
    const formValue = this.userProfileForm.value;
    console.log(formValue);
    this.userservice.updateInfo(formValue).subscribe(res => {
      console.log(`User has updated their info`)
    });
  }



}
