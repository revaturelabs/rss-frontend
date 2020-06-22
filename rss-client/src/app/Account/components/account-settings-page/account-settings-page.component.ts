import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
})
export class AccountSettingsPageComponent implements OnInit {

  user: User;
  isLoggedIn;
  constructor(private userservice: UserService) { }


  ngOnInit(): void {
    this.userservice.getAllState().subscribe(state => {
      this.isLoggedIn = state.isLoggedIn;
    })

  }
}
