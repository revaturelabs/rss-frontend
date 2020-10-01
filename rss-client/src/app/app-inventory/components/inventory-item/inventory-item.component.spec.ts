import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemComponent } from './inventory-item.component';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('InventoryItemComponent', () => {
  let component: InventoryItemComponent;
  let fixture: ComponentFixture<InventoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryItemComponent],
      providers: [DecimalPipe, NgbActiveModal],
      imports: [
        HttpClientTestingModule,
        NgbModule,
        RouterTestingModule
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'test',
      description: 'test descr',
      brand: 'test brand',
      model: 'test model',
      category: 'test cat',
      image: 'tets image',
      quantity: 1,
      unitPrice: 1,
      color: 'red',
      discounted : false,
      discountedAmount : NaN
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
