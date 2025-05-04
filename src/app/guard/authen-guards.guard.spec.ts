import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenGuardsGuard } from './authen-guards.guard';

describe('authenGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
