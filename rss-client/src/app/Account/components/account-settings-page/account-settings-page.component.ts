import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
})
export class AccountSettingsPageComponent implements OnInit {
  constructor(private userservice: UserService) {}

  user: User;
  ngOnInit(): void {
    this.userservice.getCurrentUserState().subscribe((state) => {
      this.user = state.user;
    });
    console.log(this.user);
  }
}
