import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventoryComponent } from './admin-inventory.component';

describe('AdminInventoryComponent', () => {
  let component: AdminInventoryComponent;
  let fixture: ComponentFixture<AdminInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
