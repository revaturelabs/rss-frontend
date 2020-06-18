import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTestComponent } from './post-test.component';

describe('PostTestComponent', () => {
  let component: PostTestComponent;
  let fixture: ComponentFixture<PostTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
