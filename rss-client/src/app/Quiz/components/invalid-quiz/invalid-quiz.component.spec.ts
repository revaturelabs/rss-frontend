import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidQuizComponent } from './invalid-quiz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CheaterService } from 'src/app/services/cheater.service';

describe('InvalidQuizComponent', () => {
  let component: InvalidQuizComponent;
  let fixture: ComponentFixture<InvalidQuizComponent>;
  let cheaterService: CheaterService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ InvalidQuizComponent ],
      imports: [MatDialogModule],
      
    })
    .compileComponents();

    cheaterService = TestBed.inject(CheaterService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
