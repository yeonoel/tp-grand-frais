import { TestBed } from '@angular/core/testing';

import { DepartementInfoService } from './departement-info.service';

describe('DepartementInfoService', () => {
  let service: DepartementInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartementInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
