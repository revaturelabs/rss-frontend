import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTestComponent } from './pre-test.component';

describe('PreTestComponent', () => {
  let component: PreTestComponent;
  let fixture: ComponentFixture<PreTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
