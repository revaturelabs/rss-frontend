import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnpointsOverviewPageComponent } from './earnpoints-overview-page.component';

describe('EarnpointsOverviewPageComponent', () => {
  let component: EarnpointsOverviewPageComponent;
  let fixture: ComponentFixture<EarnpointsOverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnpointsOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnpointsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
