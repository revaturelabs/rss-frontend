import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInProgressComponent } from './test-in-progress.component';

describe('TestInProgressComponent', () => {
  let component: TestInProgressComponent;
  let fixture: ComponentFixture<TestInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
