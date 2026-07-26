import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

// Step 91
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  // finalize runs whether the request completes OR errors — equivalent to a
  // try/catch/finally block — so the spinner always gets hidden either way.
  return next(req).pipe(finalize(() => loadingService.hide()));
};
