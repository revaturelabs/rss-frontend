import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnpoints-overview-page',
  templateUrl: './earnpoints-overview-page.component.html',
  styleUrls: ['./earnpoints-overview-page.component.css'],
})
export class EarnpointsOverviewPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    window.alert('bug.. splat?');
  }
}
