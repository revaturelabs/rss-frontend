import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rss-client';
  headerConfig = {
    //put stuff in here coming a service/services for user info as well
    username: 'Brad Nelson Bingham',
  };
  rootConfig = {
    userType: 'Employee', //take this info from a service gathering the user info
  };
  rootPage = 'Home';
  breadCrumbs = ['a', 'b', 'c']; //bradcrumbs
}
