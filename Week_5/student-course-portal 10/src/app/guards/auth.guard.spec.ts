import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter, Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    // authGuard injects both AuthService and Router — Router needs a
    // provider, or TestBed throws NG0201: No provider found for Router.
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation when the user is logged in', () => {
    const authService = TestBed.inject(AuthService);
    authService.isLoggedIn = true;

    const result = executeGuard({} as any, {} as any);
    expect(result).toBe(true);
  });

  it('should redirect home and block activation when the user is logged out', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    authService.isLoggedIn = false;

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
