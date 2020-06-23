import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCartComponent } from './select-cart.component';

describe('SelectCartComponent', () => {
  let component: SelectCartComponent;
  let fixture: ComponentFixture<SelectCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
