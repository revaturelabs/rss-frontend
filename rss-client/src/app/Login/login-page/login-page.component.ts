import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Statement } from '@angular/compiler';
import { CheaterService } from 'src/app/services/cheater.service';

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
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        // Validators.minLength(4),
      ]),
      password: new FormControl('', Validators.required),
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async submitForm() {
    const formValue = this.loginForm.value;
    this.userService.login(formValue).subscribe((res) => {
      if (res == null) {
        window.alert('Invalid login credentials');
      } else {
        this.user = res;
        this.userLogin.emit(res);
        this.isLoggedIn.emit(true);
        this.userService.changeUser(res);
      }
    });
  }

  changeStatus() {
    this.userService.isLoggedIn = true;
  }
}
