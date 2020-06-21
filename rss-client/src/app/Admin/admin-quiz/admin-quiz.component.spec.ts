import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizComponent } from './admin-quiz.component';

describe('AdminQuizComponent', () => {
  let component: AdminQuizComponent;
  let fixture: ComponentFixture<AdminQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
