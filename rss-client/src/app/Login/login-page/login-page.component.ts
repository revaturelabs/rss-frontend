import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @Output() userLogin = new EventEmitter();
  @Output() isLoggedIn = new EventEmitter();

  loginForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  async submitForm() {
    const formValue = this.loginForm.value;
    console.log(formValue);
    this.userService.login(formValue).subscribe((res) => {
      this.user = res;
      console.log(res);
      this.userLogin.emit(res);
      this.isLoggedIn.emit(true);
      this.userService.changeUser(res);
      // this.userService.isLoggedIn = true;
      // this.userService.user = res;
    });
  }

  changeStatus() {
    this.userService.isLoggedIn = true;
  }
}
