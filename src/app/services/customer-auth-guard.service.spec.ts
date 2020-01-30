import { TestBed } from '@angular/core/testing';

import { CustomerAuthGuardService } from './customer-auth-guard.service';

describe('CustomerAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAuthGuardService = TestBed.get(CustomerAuthGuardService);
    expect(service).toBeTruthy();
  });
});
