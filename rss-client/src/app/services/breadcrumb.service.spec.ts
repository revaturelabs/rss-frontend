import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [BreadcrumbService],
    });
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
