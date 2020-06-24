import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { User } from 'src/app/interfaces/user';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /*breadcrumbs -------------------------->user-type
    revature user
  */
  @Input() config;
  @Input() currentUser: User;

  constructor(private parent: AppComponent, private userservice: UserService) {}

  ngOnInit(): void {
    console.log(this.currentUser);
  }

  onHome() {
    this.parent.breadcrumbs = [];
    this.parent.routerCrumbs = [];
  }

  logout() {
    this.userservice.logout();
  }
}
