import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  view;
  constructor() {}

  ngOnInit(): void {}

  navigateTo(subPage) {
    this.view = subPage;
  }
}
