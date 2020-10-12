import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInventoryItemComponent } from './user-inventory-item.component';

describe('UserInventoryItemComponent', () => {
  let component: UserInventoryItemComponent;
  let fixture: ComponentFixture<UserInventoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInventoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
