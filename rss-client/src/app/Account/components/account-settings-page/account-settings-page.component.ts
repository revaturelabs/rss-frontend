import { ImageService } from './../../../services/image.service';
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
    private imageservice: ImageService,
    private userservice: UserService,
    private fb: FormBuilder
  ) {}

  selectedFile: string;
  imagePreview: any;
  placeholderPic = '../../../../assets/Images/user_image.png';
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
    this.userservice.changeUser(this.user);
  }

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
    });
    this.getUser();
  }

  getUser() {
    this.user = this.userservice.userPersistance();
    console.log(this.user.password);
    this.editForm(this.user);
    console.log(this.user);
  }
  editForm(user: User) {
    this.userProfileForm.patchValue({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  async submitForm() {
    const formValue = this.userProfileForm.value;
    console.log(formValue);
    this.userservice.updateInfo(formValue).subscribe((res) => {
      console.log(`User has updated their info`);
    });
  }
}
