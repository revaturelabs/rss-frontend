import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  view;
  user;
  constructor(private userservice: UserService, private parent: AppComponent) { }

  ngOnInit(): void {
    this.user = this.userservice.userPersistance();
  }

  navigateTo(subPage) {
    this.view = subPage;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Admin'];
      this.parent.routerCrumbs = ['admin'];
    });
  }
}
