import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/Common/services/breadcrumb.service';
import { User } from 'src/app/User/models/user';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/User/services/user.service';
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

  currentRoute(route: string) {
    switch(route) {
      case "home": {
        document.getElementById("homeLink").setAttribute("class", "current");
        document.getElementById("storeLink").setAttribute("class", "not-current");
        document.getElementById("earnpointsLink").setAttribute("class", "not-current");
        document.getElementById("cartLink").setAttribute("class", "not-current");
        document.getElementById("selectcartLink").setAttribute("class", "not-current");
        break;
      }
      case "store": {
        document.getElementById("homeLink").setAttribute("class", "not-current");
        document.getElementById("storeLink").setAttribute("class", "current");
        document.getElementById("earnpointsLink").setAttribute("class", "not-current");
        document.getElementById("cartLink").setAttribute("class", "not-current");
        document.getElementById("selectcartLink").setAttribute("class", "not-current");
        break;
      }
      case "earnpoints": {
        document.getElementById("homeLink").setAttribute("class", "not-current");
        document.getElementById("storeLink").setAttribute("class", "not-current");
        document.getElementById("earnpointsLink").setAttribute("class", "current");
        document.getElementById("cartLink").setAttribute("class", "not-current");
        document.getElementById("selectcartLink").setAttribute("class", "not-current");
        break;
      }
      case "cart": {
        document.getElementById("homeLink").setAttribute("class", "not-current");
        document.getElementById("storeLink").setAttribute("class", "not-current");
        document.getElementById("earnpointsLink").setAttribute("class", "not-current");
        document.getElementById("cartLink").setAttribute("class", "current");
        document.getElementById("selectcartLink").setAttribute("class", "not-current");
        break;
      }
      case "selectcart": {
        document.getElementById("homeLink").setAttribute("class", "not-current");
        document.getElementById("storeLink").setAttribute("class", "not-current");
        document.getElementById("earnpointsLink").setAttribute("class", "not-current");
        document.getElementById("cartLink").setAttribute("class", "not-current");
        document.getElementById("selectcartLink").setAttribute("class", "current");
        break;
      }
      default: {
        document.getElementById("homeLink").setAttribute("class", "not-current");
        document.getElementById("storeLink").setAttribute("class", "not-current");
        document.getElementById("earnpointsLink").setAttribute("class", "not-current");
        document.getElementById("cartLink").setAttribute("class", "not-current");
        document.getElementById("selectcartLink").setAttribute("class", "not-current");
        break;
      }
    }
  }

  ifHome() {
    this.onHome();
    this.currentRoute("home");
  }
}
