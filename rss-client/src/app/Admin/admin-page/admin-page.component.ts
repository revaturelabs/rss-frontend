import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  view;
  user;
  constructor(private userservice: UserService) {}

  ngOnInit(): void {
    this.user = this.userservice.userPersistance();
    console.log(this.user);
  }

  navigateTo(subPage) {
    this.view = subPage;
  }
}
