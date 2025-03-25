import { TestBed } from '@angular/core/testing';

import { UtilisateurInfoService } from './utilisateur-info.service';

describe('UtilisateurInfoService', () => {
  let service: UtilisateurInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
