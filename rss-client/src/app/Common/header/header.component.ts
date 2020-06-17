import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*breadcrumbs -------------------------->user-type
    revature user
  */
  rootPage;
  breadCrumbs = ["a","b","c"];
  constructor() { }

  ngOnInit(): void {

  }

  breadCrumbsNav(){
    
  }

}
