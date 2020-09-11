import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheaterWarningComponent } from './cheater-warning.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('CheaterWarningComponent', () => {
  let component: CheaterWarningComponent;
  let fixture: ComponentFixture<CheaterWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheaterWarningComponent ],
      imports: [MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheaterWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
