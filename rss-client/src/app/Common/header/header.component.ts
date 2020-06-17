import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  breadCrumbsNav() {}
}
