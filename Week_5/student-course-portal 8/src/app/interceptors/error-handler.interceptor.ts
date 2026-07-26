import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Step 90
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // This portal has no dedicated /login page yet (HO7's AuthGuard uses
        // a hardcoded AuthService flag) — redirecting home is the closest
        // equivalent to "navigate to login" until a real auth flow exists.
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server error — please try again later.');
      }
      // Re-throw so the calling service/component's own catchError still runs
      return throwError(() => error);
    })
  );
};
