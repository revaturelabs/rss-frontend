import { TestBed, ComponentFixture } from '@angular/core/testing';

import { CheaterService } from './cheater.service';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CheaterService', () => {
  let service: CheaterService;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(CheaterService);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify subscribers that leftTab state has changed', () => {
    service.leftTab.subscribe((value) => {
      expect(value).toBeTrue()
    })
    service.setLeftTab()
  })

  it('should notify subscribers that invalidated state has changed', () => {
    service.invalidated.subscribe((value) => {
      expect(value).toBeTrue()
    })
    service.setInvalidated()
  })

  // it('should detect when the user mouses out', () => {
  //   service.beginMonitoring();
  //   fixture.detectChanges();
  //   const body = fixture.debugElement.nativeElement.querySelector('html') ;
  //   service.leftTab.subscribe((value) => {
  //     expect(value).toBeTrue()
  //   })
  //   body.triggerEventHandler('mouseout', {});
  //   fixture.detectChanges();
  // })

  // it('should set valitity and left table to false when monitoring starts', () => {
  //   service.leftTab.subscribe(() => {
      
  //   })
  //   service.beginMonitoring()
  // })

});
