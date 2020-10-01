import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { User } from 'src/app/interfaces/user';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/User/user/services/user.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

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
  @Output() isLoggedIn = new EventEmitter();

  constructor(
    private parent: AppComponent,
    private userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onHome() {
    this.parent.breadcrumbs = [];
    this.parent.routerCrumbs = [];
  }

  logout() {
    this.isLoggedIn.emit(false);
    this.userservice.logout();
  }
}
