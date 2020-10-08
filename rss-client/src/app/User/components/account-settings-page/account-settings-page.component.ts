import { ImageService } from './../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/services/user.service';
import { User } from 'src/app/User/models/user';
import { Account } from 'src/app/User/models/account';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/User/services/account.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss'],
})
export class AccountSettingsPageComponent implements OnInit {
  // newPass = new FormControl('');
  // confirmPass = new FormControl('');
  user: User;
  isLoggedIn;
  userProfileForm: FormGroup;
  evalAccount: Account;
  bugAccount: Account;
  overflowAccount: Account;
  myAccount: Account = {
    accId: 0,
    accTypeId: 0,
    userId: 0,
    points: 0,
  };
  accounts: Account[];
  passForm: FormGroup;

  constructor(
    private imageservice: ImageService,
    private userservice: UserService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private parent: AppComponent
  ) {}

  selectedFile: string;
  imagePreview: any;
  placeholderPic = 'https://i.imgur.com/HaOnwin.png';
  onFileChanged(event) {
    if (event.target.value) {
      const file = event.target.files[0];
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }).then((base64: string): any => {
        this.imagePreview = [base64];
        this.selectedFile = base64;
      });
    }
  }
  onUpload() {
    let arr = this.selectedFile.split(',');
    this.imageservice.uploadImage(this.user.userId, arr[1]).subscribe();
    this.user.profilePic = arr[1];
    this.userservice.changeProfilePic(this.user);
    window.alert('Updated picture');
  }

  ngOnInit(): void {
    this.user = this.userservice.userPersistance();
    console.log(this.user);
    this.userProfileForm = this.fb.group({
      userId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.passForm = this.fb.group({
      newPass: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required),
    });
    this.getUser();
    this.editForm();

    this.accountService.getAccountByUserId(this.user).subscribe((res) => {
      res.forEach((x) => {
        if (x.accTypeId == 1) {
          this.bugAccount = x;
        }
        if (x.accTypeId == 2) {
          this.evalAccount = x;
        }
        if(x.accTypeId == 3){
          this.overflowAccount = x; 
        }
      });
    });
    this.grabAccounts();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Settings'];
      this.parent.routerCrumbs = ['account/settings'];
    });
  }
  getUser() {
    this.user = this.userservice.userPersistance();
  }
  editForm() {
    this.userProfileForm.patchValue({
      userId: this.user.userId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    });
  }
  get userId() {
    return this.userProfileForm.get('userId');
  }
  get firstName() {
    return this.userProfileForm.get('firstName');
  }
  get lastName() {
    return this.userProfileForm.get('lastName');
  }
  get email() {
    return this.userProfileForm.get('email');
  }

  async submitForm() {
    const formValue = this.userProfileForm.value;
    console.log(formValue);
    window.alert('Updated account information');
    this.userservice.updateInfo(formValue).subscribe((res) => {});
  }

  createAccount(event) {
    let index = null;
    if (event == 'Eval') {
      let num = this.accounts[1].accTypeId;
      this.myAccount.accTypeId = num;
      this.myAccount.userId = this.userservice.userPersistance().userId;
      index = 1;
    } else if (event == 'Bug') {
      this.myAccount.accTypeId = this.accounts[0].accTypeId;
      this.myAccount.userId = this.userservice.userPersistance().userId;
      index = 0;
    }
    else if (event == 'Overflow'){
      this.myAccount.accTypeId = this.accounts[2].accTypeId;
      this.myAccount.userId = this.userservice.userPersistance().userId;
      index = 2;
    }
    this.accountService.createAccount(this.myAccount).subscribe((res) => {
      if(index == 0){
        this.bugAccount = res;
      }
      else if(index == 1){
        this.evalAccount = res;
      }
      else if(index == 2){
        this.overflowAccount = res;
      }
    });
    //window.location.reload();
  }

  grabAccounts() {
    return this.accountService.getAllAccounts().subscribe((res) => {
      this.accounts = res;
    });
  }

  async compareAndChangePassword() {
    if (
      this.passForm.controls['newPass'].value ==
      this.passForm.controls['confirmPass'].value
    ) {
      const formValue = this.passForm.controls['newPass'].value;
      this.userservice.updatePassword(formValue).subscribe();
      window.alert('Your password has been updated');
      this.passForm.reset();
    } else {
      window.alert('Your new passwords did not match.');
    }
  }
}
