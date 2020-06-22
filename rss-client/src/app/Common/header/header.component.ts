import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { User } from 'src/app/interfaces/user';

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


  constructor() { }

  ngOnInit(): void {
    console.log(this.currentUser)
  }
}
