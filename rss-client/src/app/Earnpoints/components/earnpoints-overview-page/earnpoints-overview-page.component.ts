import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-earnpoints-overview-page',
  templateUrl: './earnpoints-overview-page.component.html',
  styleUrls: ['./earnpoints-overview-page.component.css'],
})
export class EarnpointsOverviewPageComponent implements OnInit {
  constructor(
    private breadcrumbservice: BreadcrumbService,
    private parent: AppComponent
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.breadcrumbs = ['Earn Points'];
      this.parent.routerCrumbs = ['earnpoints'];
    });
  }
  onClick() {
    window.alert('bug.. splat?');
  }
}
