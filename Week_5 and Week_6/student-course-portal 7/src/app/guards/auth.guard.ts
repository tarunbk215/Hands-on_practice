import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Step 75: Angular 20's CLI generates functional guards (CanActivateFn) by
// default rather than a class implementing CanActivate — same contract,
// just a plain function you register directly in the route config.
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
