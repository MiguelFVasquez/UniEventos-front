import { TestBed } from '@angular/core/testing';

import { MiCuentaUserServiceService } from './mi-cuenta-user-service.service';

describe('MiCuentaUserServiceService', () => {
  let service: MiCuentaUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiCuentaUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
